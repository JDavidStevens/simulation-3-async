select * from robots
where first_name = $1
order by last_name asc;