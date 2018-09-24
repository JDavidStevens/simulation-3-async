create table users_auth0(
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    profile_name TEXT NOT NULL,
    picture TEXT NOT NULL
)