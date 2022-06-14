const express = require('express');
const bodyParser = require('body-parser')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const Product_Route = require("./src/Routes/Product_Route")

const app = express()
const server = new HttpServer(app)
const io = new IOServer(server)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

new Product_Route(app)

app.get("/", (req, res) => {
    res.send(`Aplicacion abierta en el puerto ${PORT}`)
})

const biblioteca = []
const Mensajes = []
// websoket

io.on("connection", (socket) => {

    socket.emit(`server:catchConect`, { WebSocket_id: socket.id, status: 200 })
    console.log("Nueva Coneccion: ", socket.id)
    socket.emit("server:NuevaEntrada", biblioteca)
    socket.emit("server:NuevoMensaje", Mensajes)

    socket.on("disconnect", () => {
        console.log(socket.id, "se desconecto")

    })

    socket.on("client:enviarLibro", (Libro) => {
        biblioteca.push(Libro)
        io.emit("server:NuevaEntrada", biblioteca)
    })
    socket.on("client:enviarMensaje", (msj) => {
        Mensajes.push({ ...msj, Date: new Date().toDateString() })
        io.emit("server:NuevoMensaje", Mensajes)
    })
})

// servidor
const PORT = process.env.PORT || 3005
server.listen(PORT, () => {
    console.log(`Aplicacion abierta en el puerto ${PORT}`)
})