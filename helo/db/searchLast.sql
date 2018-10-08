select * from robots
where id != $1 and last_name = $2 
order by first_name asc
offset $3
limit 4;