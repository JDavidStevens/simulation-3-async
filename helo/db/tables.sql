create table users_auth0(
    id SERIAL PRIMARY KEY not null,
    auth_id text unique,
    name VARCHAR(75),
    email VARCHAR(75),
    picture TEXT
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