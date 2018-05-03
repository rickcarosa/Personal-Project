insert into order_items(order_id, show_title, price)

values($1, $2, $3)

returning *;

