-- Blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  image_url text,
  is_featured boolean not null default false,
  author_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admins table: only emails listed here can create/edit/delete posts
create table if not exists public.blog_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.blog_posts enable row level security;
alter table public.blog_admins enable row level security;

-- Anyone can read posts
create policy "Public can read blog posts"
  on public.blog_posts for select
  using (true);

-- Only admins can insert posts
create policy "Admins can insert blog posts"
  on public.blog_posts for insert
  with check (
    exists (
      select 1 from public.blog_admins
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Admins can update their own posts (or any post if you want full admin)
create policy "Admins can update blog posts"
  on public.blog_posts for update
  using (
    exists (
      select 1 from public.blog_admins
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Admins can delete posts
create policy "Admins can delete blog posts"
  on public.blog_posts for delete
  using (
    exists (
      select 1 from public.blog_admins
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Only service role can modify admins table (manage via Supabase dashboard)
create policy "No public access to admins table"
  on public.blog_admins for select
  using (true); -- allow read so frontend can check

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute procedure public.set_updated_at();
