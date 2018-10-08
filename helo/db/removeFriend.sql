update robots
set friend = null
where id=$2;

select * from robots
where id != $1
order by last_name
limit 6
offset $3;