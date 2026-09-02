import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@hnk/database';

export type HnkSupabaseClient = SupabaseClient<Database>;

export function createHnkSupabaseClient(
  url: string,
  publishableKey: string,
): HnkSupabaseClient {
  if (!url) throw new Error('Supabase URL is required');
  if (!publishableKey) throw new Error('Supabase publishable key is required');

  return createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
