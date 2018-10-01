select * from robots
where last_name = $1
order by first_name asc;