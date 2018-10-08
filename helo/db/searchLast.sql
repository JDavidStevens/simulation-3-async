select * from robots
where id != $1 and last_name = $2 
order by first_name
offset $3
limit 6;