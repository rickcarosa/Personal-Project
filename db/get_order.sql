select * from orders
join order_items on order_items.order_id = orders.id
where user_id = $1
