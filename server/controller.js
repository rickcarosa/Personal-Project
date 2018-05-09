
module.exports = {
    cart: (req, res) => {               // gets empty cart
        // console.log('haha')
        const {id} = req.user
        const db = req.app.get('db')
        db.get_cart([id]).then( cart => {
            // console.log(cart, 'cart');
            res.status(200).send(cart)
        }).catch((err) => {
            console.log(err)})
    },

    // order: (req, res) => {              
    //     const {id} = req.user
    //     // const {limit} = req.user.params
    //     const db = req.app.get('db')
    //     db.get_order([id]).then( order => {
    //         console.log(order, 'order');
    //         res.status(200).send(order)
    //     }).catch((err) => {
    //         console.log(err)})
    // },
    
    createCart: (req, res) => {
        // console.log(req.body)
        const {name, description, price, picture} = req.body
        const db = req.app.get('db')
        if (req.user){
            db.create_cart([req.user.id, name, description, price, picture]).then( cart => {
                // console.log(cart)
                res.status(200).send(cart)
            }).catch(console.log)
        }
    },

    createOrder: (req, res) => {
        const {totalPrice, show_title, show_price, order_ts} = req.body
        const db = req.app.get('db')
        db.create_order([req.user.id, totalPrice, order_ts]).then( order => {
            // console.log(order)
            let stack = []
            show_title.forEach((show, index) => {
                stack.push(db.create_order_item([order[0].id, show_title[index], show_price[index]]))
                console.log('order id', order[0].id, show_title[index], show_price[index] )
            })
            Promise.all(stack).then( responses => {
                db.get_latest_order([order[0].id]).then(order=>{
                    console.log('final final order', order)
                    db.delete_cart([req.user.id]).then( resp => {
                        console.log('delete')
                        res.status(200).send(order)
                        })
                    }).catch(console.log)
                }) 
            })
    },

    deleteShow: (req, res) => {
        let id = req.params.id
        // console.log(req.params.id)
        let db = req.app.get('db')
        db.delete_show([id, req.user.id]).then( (cart) => {
            // console.log(cart)
            res.status(200).send(cart)
        }).catch(console.log)
    }

    
}