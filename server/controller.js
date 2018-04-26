
module.exports = {
    read: (req, res) => {
        // console.log('haha')
        const {id} = req.user
        // console.log(req.user)
        const db = req.app.get('db')
        db.get_cart([id]).then( cart => {
            // console.log(cart, 'cart');
            res.status(200).send(cart)
        }).catch((err) => {
            console.log(err)})
    },
    
    create: (req, res) => {
        console.log(req.body)
        const {name, price, picture} = req.body
        const db = req.app.get('db')

        db.create_cart([req.user.id, name, price, picture]).then( cart => {
            // console.log(cart)
            res.status(200).send(cart)
        })
    }

    
}