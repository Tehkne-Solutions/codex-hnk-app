# supabase

Infraestrutura Supabase da plataforma HNK.

Estrutura prevista:
- `migrations/`
- `functions/`
- `seed/`

Regras:
- RLS em tabelas expostas;
- nunca expor `service_role` no mobile/web;
- Diário sincroniza ciphertext, não texto em claro;
- migrations versionadas no GitHub;
- alterações de schema devem ser verificadas antes do commit;
- Storage começa como object storage oficial do MVP.

O schema será criado depois da conexão do projeto Supabase ao repositório.
