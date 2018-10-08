select * from robots 
where id != $1
order by last_name
offset $2 
limit 6;



