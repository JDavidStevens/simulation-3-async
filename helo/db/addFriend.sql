update robots
set friend = $1
where id=$2;

select * from robots;