update robots
set friend = null
where id=$2;

select * from robots
where id != $1
limit 6;