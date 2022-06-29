const options = require("./dbconfig")
const knex = require("knex")(options)

const productos = [
    {
        "Autor": "John Green",
        "Titulo": "Bajo la misma estrella",
        "Descripcion": "Dos adolecentes moribundos enamorados",
        "Mostrar_Web": true,
        "Ratio": "5",
        "Precio": 100
    },
    {
        "Autor": "John Boyne",
        "Titulo": "El niño del pijama de rayas",
        "Descripcion": "Una triste historia sobre un niño judio en la alemaña nazi",
        "Mostrar_Web": true,
        "Ratio": "7",
        "Precio": 100
    },
    {
        "Autor": "Mark Haddon",
        "Titulo": "El curioso incidente del perro a medianoche",
        "Descripcion": "Un niño con Síndrome de Asperger que resuelve el misterio del asesinato de un perro",
        "Mostrar_Web": true,
        "Ratio": "12",
        "Precio": 100
    },
    {
        "Autor": "George R.R",
        "Titulo": "Juego de tronos",
        "Descripcion": "Historia sobre un mundo medieval en el que varias familias se pelean por un trono, amor, sangre, sexo y mas sangre... Y DRAGONES",
        "Mostrar_Web": true,
        "Ratio": "12",
        "Precio": 100
    },
    {
        "Autor": "John Ronald Reuel Tolkien",
        "Titulo": "El señor de los anillos",
        "Descripcion": "Un mundo de la edad media se enfrenta a un poderoso ser que quiere gobernar a todos mediante la adquisicion de un anillo magico, nuestros heroes lo van a tratar de detener destruyendo ese anillo... lo lograran??",
        "Mostrar_Web": true,
        "Ratio": "12",
        "Precio": 100
    },
    {
        "Autor": "John Green",
        "Titulo": "Bajo la misma estrella",
        "Descripcion": "Dos adolecentes moribundos enamorados",
        "Mostrar_Web": true,
        "Ratio": "5",
        "Precio": 100
    },
    {
        "Autor": "Gregorio",
        "Titulo": "El amanecer de los muertos",
        "Descripcion": "123",
        "Mostrar_Web": false,
        "Ratio": "1",
        "Precio": "1",
    }
]

knex("libros").insert(productos).then(() => {
    console.log("Todo ok")
}).catch((err) => {
    console.log(err)
})
