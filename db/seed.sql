create table users(
    id serial primary key,
    display_name text,
    auth_id text,
    image text,
    email text
);

create table carts(
    id serial primary key,
    user_id integer references users(id),
    show_title text,
    price real,
    image_cart text
);

create table orders(
    id serial primary key,
    user_id integer, 
    order_ts timestamp
);

create table order_items(
    id serial primary key,
    order_id integer references order(id),
    show_id integer, 
    quantity integer,
    price real
);

select * from users;
select * from carts;

/* to find user that is logged in */
select * from users
where auth_id = $1;  

/* will return user who is logged in */
select * form users
where id = $1; 


-- select title, quantity, price, product.id from carts