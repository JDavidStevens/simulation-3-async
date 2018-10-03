select * from robots 
where id != $1
order by id asc;