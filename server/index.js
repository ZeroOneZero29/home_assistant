const express = require('express')
const app = express()   
const cors = require('cors')
const dotenv = require('dotenv')

app.use(cors())
dotenv.config()


app.listen(process.env.PORT_SERVER, () => {
    console.log(process.env.PORT_SERVER)
})

