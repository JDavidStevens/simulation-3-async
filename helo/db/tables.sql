create table users_auth0(
    id SERIAL PRIMARY KEY,
    auth_id VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    profile_name TEXT NOT NULL,
    picture TEXT NOT NULL
)

create table robots(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(75),
    gender VARCHAR(50),
    hair VARCHAR(50),
    eye VARCHAR(50),
    hobby VARCHAR(100),
    bday int not null,
    bmonth VARCHAR(50) not null,
    byear int not null,
    picture text
)