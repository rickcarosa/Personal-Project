insert into carts(user_id, show_title, price, image)

values($1, $2, $3, $4);

select * from carts
where user_id = $1;