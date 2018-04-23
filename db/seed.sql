create table users(
    id serial primary key,
    display_name text,
    auth_id text,
    image text,
    email text
);

create table carts(
    id serial primary key,
    user_id integer references users (id),
    show_title text,
    quantity integer
);

select * from users;
select * from carts;

