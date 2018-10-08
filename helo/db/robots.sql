select * from robots 
where id != $1
order by id asc
offset $2 
limit 4;



