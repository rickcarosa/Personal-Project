insert into carts(user_id, show_title, description, price, image_cart)

values($1, $2, $3, $4, $5);

select * from carts
where user_id = $1;