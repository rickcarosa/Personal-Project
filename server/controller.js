
module.exports = {
    read: (req, res) => {
        // console.log('haha')
        const {id} = req.user
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
        if (req.user){
            db.create_cart([req.user.id, name, price, picture]).then( cart => {
                // console.log(cart)
                res.status(200).send(cart)
            }).catch(console.log)
        }
    },

    delete: (req, res) => {
        let id = req.params.id
        console.log(req.params.id)
        let db = req.app.get('db')
        db.delete_show([id, req.user.id]).then( (cart) => {
            // console.log(cart)
            res.status(200).send(cart)
        }).catch(console.log)
    }

    
}