const axios = require('axios')



module.exports = {
    show: (req, res) => {
        res.status(200).send(shows)
    }
}