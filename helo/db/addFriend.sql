update robots
set friend = $1
where auth_id <> null;