const express = require('express');


const app = express()
const PORT = process.env.PORT || 3005
const Libros = []

app.use(express.urlencoded({ extended: true }))


app.set('views', './views')
app.set('view engine', 'ejs')

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