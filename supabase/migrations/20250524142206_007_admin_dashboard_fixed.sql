-- helper now returns tstzrange, not daterange
create or replace function public.dashboard_range(p_filter text)
returns tstzrange
language sql stable as $$
  select case p_filter
    when '7d'  then tstzrange(now() - interval '7 days',  now(), '[]')
    when '30d' then tstzrange(now() - interval '30 days', now(), '[]')
    when 'mtd' then tstzrange(date_trunc('month',   now()), now(), '[]')
    when 'qtd' then tstzrange(date_trunc('quarter', now()), now(), '[]')
    when 'ytd' then tstzrange(date_trunc('year',    now()), now(), '[]')
    else              tstzrange(timestamp '2020-01-01 00:00:00+00', now(), '[]')
  end;
$$;