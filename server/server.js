const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , port = 3005
    , controller = require('./controller')
    , cors = require('cors')

app.use(bodyParser.json());
app.use(cors());



app.listen(3005, () => console.log('THINK OF SOMETHING!!!!'));