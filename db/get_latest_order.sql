select o.*, oi.* from orders o
join order_items oi on oi.order_id = o.id
where o.id = $1
-- limit 1