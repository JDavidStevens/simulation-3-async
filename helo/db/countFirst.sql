select count(id) from robots
where id != $1 and first_name = $2;