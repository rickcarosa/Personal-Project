select * from carts
join users on users.id = carts.user_id
where users.id = $1