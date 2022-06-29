const express = require("express");
const cors = require("cors");
const config = require("./Database/dbconfig")

const Product_Route = require("./src/Routes/Product_Route.js")
const Cart_Route = require("./src/Routes/Cart_Route.js")



const app = express()
const PORT = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(express.json())


app.use(express.static('public'));



new Product_Route(app)
new Cart_Route(app)




app.get("/", async (req, res) => {
    res.send({ Sucsees: "Ok", Status: 200 })
})
app.get("/carrito", async (req, res) => {
    res.send({ Sucsees: "Ok", Status: 200 })
})



app.listen(PORT, () => {
    console.log(`Aplicacion abierta en el puerto ${PORT}`)
})

