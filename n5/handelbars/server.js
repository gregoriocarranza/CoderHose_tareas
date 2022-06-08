const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express()
const PORT = process.env.PORT || 3005
const Libros = []

app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './src/views');
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));

app.set('view engine', 'hbs');


app.get("/", (req, res) => {
    res.render("./layouts/start")

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