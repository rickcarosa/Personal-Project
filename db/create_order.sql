insert into orders(user_id, order_ts, total_price)

values($1, $2, $3);

returning *;