select * from robots 
where id != $1 and friend is null
order by last_name;