select * from robots 
where id != $1
order by id asc
offset $2 
limit 4;

-- select count(id) from robots
-- where id !=$1;

