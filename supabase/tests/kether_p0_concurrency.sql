begin;

select plan(4);

create extension if not exists dblink with schema extensions;

-- Fixture is committed through a separate admin connection so both concurrent
-- authenticated connections can observe it.
select extensions.dblink_connect(
  'setup',
  'host=127.0.0.1 port=5432 dbname=postgres user=postgres password=postgres'
);

select extensions.dblink_exec(
  'setup',
  $$delete from auth.users where id = '44444444-4444-4444-4444-444444444444'$$
);

select extensions.dblink_exec(
  'setup',
  $$
    insert into public.codex_days (
      day, chapter, sephira, world, level, xp, title, slug,
      source_path, source_sha, status
    ) values (
      1, 1, 'Kether', 'Atziluth', 1, 150,
      'Kether Concurrency Test Day 001',
      'kether-concurrency-test-day-001',
      'canon/test/concurrency-day-001.md',
      'concurrency-source-sha-001',
      'canon'
    )
    on conflict (day) do update set
      xp = excluded.xp,
      title = excluded.title,
      source_sha = excluded.source_sha,
      status = excluded.status
  $$
);

select extensions.dblink_exec(
  'setup',
  $$
    insert into auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) values (
      '44444444-4444-4444-4444-444444444444',
      '00000000-0000-0000-0000-000000000000',
      'authenticated', 'authenticated', 'kether-race@example.invalid', '',
      now(), '{}'::jsonb, '{}'::jsonb, now(), now()
    )
  $$
);

select extensions.dblink_exec(
  'setup',
  $$
    insert into public.practice_sessions (
      id, user_id, day, client_session_id, mode, state, evidence
    ) values
      (
        'dddddddd-dddd-dddd-dddd-dddddddd0001',
        '44444444-4444-4444-4444-444444444444',
        1, 'race-device-a', 'first_completion', 'evidence_pending',
        '{"protocol_completed":true,"return_confirmed":true}'::jsonb
      ),
      (
        'dddddddd-dddd-dddd-dddd-dddddddd0002',
        '44444444-4444-4444-4444-444444444444',
        1, 'race-device-b', 'first_completion', 'evidence_pending',
        '{"protocol_completed":true,"return_confirmed":true}'::jsonb
      )
  $$
);

select extensions.dblink_disconnect('setup');

-- Two independent authenticated database sessions for the same HNK user.
select extensions.dblink_connect(
  'device_a',
  'host=127.0.0.1 port=5432 dbname=postgres user=postgres password=postgres'
);
select extensions.dblink_connect(
  'device_b',
  'host=127.0.0.1 port=5432 dbname=postgres user=postgres password=postgres'
);

select extensions.dblink_exec('device_a', 'set role authenticated');
select extensions.dblink_exec(
  'device_a',
  $$set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444'$$
);
select extensions.dblink_exec('device_b', 'set role authenticated');
select extensions.dblink_exec(
  'device_b',
  $$set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444'$$
);

-- Send both RPCs before waiting for either result: this is a real race.
select ok(
  extensions.dblink_send_query(
    'device_a',
    $$select public.complete_codex_day(1::smallint, 'dddddddd-dddd-dddd-dddd-dddddddd0001'::uuid, 'race-a', now())::text$$
  ) = 1,
  'XP-005 concurrent completion request A dispatched'
);
select ok(
  extensions.dblink_send_query(
    'device_b',
    $$select public.complete_codex_day(1::smallint, 'dddddddd-dddd-dddd-dddd-dddddddd0002'::uuid, 'race-b', now())::text$$
  ) = 1,
  'XP-005 concurrent completion request B dispatched'
);

create temp table qa_kether_race_results (
  client text primary key,
  payload jsonb not null
);

insert into qa_kether_race_results(client, payload)
select 'device_a', payload::jsonb
from extensions.dblink_get_result('device_a') as r(payload text);

insert into qa_kether_race_results(client, payload)
select 'device_b', payload::jsonb
from extensions.dblink_get_result('device_b') as r(payload text);

select extensions.dblink_disconnect('device_a');
select extensions.dblink_disconnect('device_b');

select is(
  (select sum((payload ->> 'xp_awarded')::integer) from qa_kether_race_results),
  150::bigint,
  'XP-005 concurrent RPCs award canonical XP at most once'
);

select ok(
  (select count(*) = 1
     from public.day_completions
    where user_id = '44444444-4444-4444-4444-444444444444'
      and day = 1)
  and
  (select count(*) = 1
     from public.xp_events
    where user_id = '44444444-4444-4444-4444-444444444444'
      and day = 1
      and source = 'canonical_day_completion')
  and
  (select xp_total = 150
     from public.user_progress
    where user_id = '44444444-4444-4444-4444-444444444444'),
  'OFF-003 two-device race leaves one completion, one XP event and one XP total increment'
);

select * from finish();
rollback;
