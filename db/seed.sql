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
    order_ts timestamp, 
    total_price real
);

create table order_items(
    id serial primary key,
    order_id integer references orders(id),
    show_title text, 
    price real
);

select * from users;
select * from carts;
select * from orders;
select * from order_items;

/* to find user that is logged in */
select * from users
where auth_id = $1;  

/* will return user who is logged in */
select * form users
where id = $1; 


-- select title, quantity, price, product.id from carts