insert into orders(user_id, total_price, order_ts)

values($1, $2, CURRENT_TIMESTAMP)

returning *;
