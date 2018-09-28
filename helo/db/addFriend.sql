update robots
set friend = $2
where id=$1;

update robots
set friend=$1 
where id =$2;

select * from robots;