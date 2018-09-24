INSERT INTO users_auth0(auth_id, email, profile_name, picture)
values ($1,$2,$3,$4)
RETURNING *;