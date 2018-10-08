select * from robots
where id != $1 and first_name = $2 
order by last_name 
offset $3
limit 6;