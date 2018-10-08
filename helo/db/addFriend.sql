update robots
set friend = $1
where id=$2;

select * from robots
where id != $1 and friend = null
order by last_name;