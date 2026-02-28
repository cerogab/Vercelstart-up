-- Contacts table (run in Supabase SQL editor)

create table contacts (
  id bigint primary key generated always as identity,
  email text not null unique,
  first_name text not null,
  created_at timestamptz default now()
);

-- Insert some sample data into the table
insert into contacts (email, first_name)
values
  ('diego@example.com', 'Diego'),
  ('jane@example.com', 'Jane'),
  ('alex@example.com', 'Alex');

alter table contacts enable row level security;
