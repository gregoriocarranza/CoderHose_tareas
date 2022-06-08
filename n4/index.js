const express = require('express');
const Product_Route = require("./Routes/Product_Route.js")
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3005


app.get("/", (req, res) => {
    res.send(`Aplicacion abierta en el puerto ${PORT}`)
})

new Product_Route(app)



app.listen(PORT, () => {
    console.log(`Aplicacion abierta en el puerto ${PORT}`)
})