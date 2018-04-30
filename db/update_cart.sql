update carts
set user_id = $2, show_title = $3, description = $4, price = $5, image_cart = $6
where id = $1