
module.exports = {
    read: (req, res) => {
        const {user} = req
        const db = req.app.get('db')

        db.create_cart(user.id).then( cart => {
            console.log(cart)
            res.status(200).send(cart)
        })
    }
}