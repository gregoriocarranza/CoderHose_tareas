const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express()
const PORT = process.env.PORT || 3005
const Libros = []

app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join('./src/views'));
app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render("start")

})
app.get("/bibloteca", (req, res) => {
    res.render("Lista", { Libros })

})
app.post("/bibloteca", (req, res) => {
    const libro = req.body
    Libros.push(libro)
    console.log(Libros)
    res.render("Lista", { Libros })

})

app.listen(PORT, () => {
    console.log(`Servidor escucnahdo en el puerto ${PORT}`)
})