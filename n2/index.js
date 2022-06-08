
const fs = require("fs")
const DirAux = []

class Reseña {
    /**
     * 
     * @param {String} Autor Autor de la novela 
     * @param {String} Titulo Titulo de la novela
     * @param {String} Reseña Sinopsis de la novela
     * @param {Int} Puntaje Puntaje que se le da
     */
    constructor(Autor, Titulo, Sinopsis, Puntaje) {
        this.Autor = Autor
        this.Titulo = Titulo
        this.Sinopsis = Sinopsis
        this.Puntaje = `${Puntaje}/10`

    }

    async save(Reseña) {

        DirAux.push({ ...Reseña, id: DirAux.length })


        await fs.promises.writeFile("Base_de_datos/Directorio.txt", JSON.stringify(DirAux, null, 2)).then(u => {
            console.log("Archivo Escrito con exito")
        }).catch(err => {
            console.log(err)
        })



    }

    getById(Id) {
        fs.readFile(`Base_de_datos/Directorio.txt`, 'utf8', (err, data) => {
            if (err) {
                console.log("No existe un archivo con esa ID")
            } else {
                const obj_data = JSON.parse(data)
                const Elegido = obj_data.find(u => u.id === Id)
                console.log(Elegido)

            }
        })
    }
    getAll() {
        fs.promises.readdir("Base_de_datos").then(Directorio => {
            Directorio.forEach(dir => {
                fs.readFile(`Base_de_datos/${dir}`, 'utf8', (err, data) => {
                    if (err) {

                    } else {
                        console.log(JSON.parse(data))
                    }
                })
            });

        }).catch(err => {
            console.log(err)
        })
    }

    deleteById(Id) {

        fs.readFile(`Base_de_datos/Directorio.txt`, 'utf8', (err, data) => {
            if (err) {
                console.log("No existe un archivo con esa ID")
            } else {
                const obj_data = JSON.parse(data)
                const Elegido = obj_data.filter(u => u.id != Id)
                // console.log(Elegido)

                fs.promises.writeFile("Base_de_datos/Directorio.txt", JSON.stringify(Elegido, null, 2)).then(u => {
                    console.log("Item Eliminado")
                }).catch(err => {
                    console.log(err)
                })

            }
        })

    }
    async deleteAll() {
        await fs.promises.unlink("Base_de_datos/Directorio.txt").then(U => {
            console.log("Items eliminados")
        }).catch(err => {
            console.log(err)
        })

    }


    leerDirectorio() {
        fs.promises.readdir("Base_de_datos").then(Directorio => {
            console.log(Directorio)


        }).catch(err => {
            console.log(err)
        })

    }


}

/* 
Reseña
{
    "Autor":string
    "Titulo":string
    "Reseña":string
    "Puntaje":int (es sobre 10)
}
*/



const reseña = new Reseña("John Green", "Bajo la misma estrella", "Dos adolecentes moribundos enamorados", 5)
const reseña2 = new Reseña("John Boyne", "El niño del pijama de rayas", "Una triste historia sobre un niño judio en la alemaña nazi", 7)
const reseña3 = new Reseña("Mark Haddon", "El curioso incidente del perro a medianoche", "Un niño con Síndrome de Asperger que resuelve el misterio del asesinato de un perro.", 12)



reseña.save(reseña)
reseña.save(reseña2)
reseña.save(reseña3)


// reseña.getById(1)
// reseña.getAll()
// reseña.deleteById(1)
// reseña.deleteAll()


// reseña.leerDirectorio()
