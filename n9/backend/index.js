const express = require("express");
const cors = require("cors");
const config = require("./Database/Sql/dbconfig")
const mongoose = require("mongoose")

const Product_Route = require("./src/Routes/Product_Route.js")
const Cart_Route = require("./src/Routes/Cart_Route.js")

const MongoUrl = process.env.MONGO || "mongodb://user:user123@database-0-shard-00-00.vgtwg.mongodb.net:27017,database-0-shard-00-01.vgtwg.mongodb.net:27017,database-0-shard-00-02.vgtwg.mongodb.net:27017/CoderHouse?ssl=true&replicaSet=atlas-uit0wk-shard-0&authSource=admin&retryWrites=true&w=majority"


const app = express()
const PORT = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(express.json())


app.use(express.static('public'));

function reloj() {
    momentoActual = new Date()
    return momentoActual

}


new Product_Route(app)
new Cart_Route(app)




app.get("/", async (req, res) => {
    res.send({ Sucsees: "Ok", Status: 200 })
})
app.get("/carrito", async (req, res) => {
    res.send({ Sucsees: "Ok", Status: 200 })
})

mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once("open", () => {
    console.log("Conexion a MongoDb exitosa")
    app.listen(PORT, () => {
        console.log(`Aplicacion abierta en el puerto ${PORT} -- ${reloj()}`)
    })
})
connection.on("Error", (err) => {
    console.log("Conexion sin exito, Error:", err.message)
})



