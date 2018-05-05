delete from orders
where user_id = $1; 

delete from order_items
where user_id = $1;