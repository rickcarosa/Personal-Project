insert into users(display_name, auth_id, image, email)

values ($1, $2, $3, $4)

RETURNING *;  /* insert into database and return the user just inserted/deleted/modified */