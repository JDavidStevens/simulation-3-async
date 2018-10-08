select count(id) from robots
where id != $1 and last_name = $2;