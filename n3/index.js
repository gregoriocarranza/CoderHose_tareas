const express = require('express');
const cors = require('cors');
const fs = require('fs');



const app = express()
const PORT = process.env.PORT || 3005
app.use(express.json());


app.get("/", (req, res) => {
    res.send(`Server Listen in Port ${PORT}`)
})



app.get("/productos", (req, res) => {

    fs.readFile(`Base_de_datos/Directorio_2.txt`, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ sucsess: false, data: "No Data" })
        } else {
            res.status(200).json({ sucsess: true, data: JSON.parse(data) })
        }
    })

})


app.get("/productoRandom", (req, res) => {

    fs.readFile(`Base_de_datos/Directorio_2.txt`, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ sucsess: false, data: "No Data" })
        } else {
            const Data = JSON.parse(data, null)
            const RandomId = Math.round(Math.random() * (Data.length - 1) + 1)
            console.log(RandomId)
            const Selected = Data.find(u => u.id == RandomId)

            res.status(200).json({ sucsess: true, Producto_Random: { Selected } })
        }
    })

})


app.listen(PORT, () => {
    console.log("___________________________________________________")
    console.log(`Server Listen in Port ${PORT}`)
})
