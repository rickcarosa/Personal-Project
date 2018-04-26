delete from carts
where id = $1;

select * from carts
where user_id = $2