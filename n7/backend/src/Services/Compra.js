const fs = require('fs')
const DirAux = []

class Contenedor {

    constructor(DirFile) {
        this.DirFile = DirFile
    }

    async save(obj) {


        const txt = await this.getAll();

        let newID

        if (txt.length === 0) {
            newID = 1
        } else {
            newID = txt[txt.length - 1].id + 1
        }

        const NewObj = { ...obj, id: newID, Compra: [] }
        await txt.push(NewObj)
        try {
            await fs.promises.writeFile(this.DirFile, JSON.stringify(txt, null, 2))
            console.log("Archivo Escrito con exito")
            return (NewObj)

        } catch (error) {

        }



    }
    async AddProduct(data) {
        try {
            // console.log(data.compra)
            const txt = await this.getAll();
            let txt2 = []
            const user = txt.find((u) => u.uuid == data.id)
            txt2 = txt.filter((u) => u.uuid != data.id)
            // console.log(user)
            user.Compra.push(data.compra)



            txt2.push(user)

            await fs.promises.writeFile(this.DirFile, JSON.stringify(txt2, null, 2))
        } catch (error) {

        }

    }
    async getById(Id) {

        try {

            const file = await fs.promises.readFile(this.DirFile, 'utf-8')
            const tex = JSON.parse(file)

            const Elegido = tex.find(u => u.uuid === Id)

            return (Elegido)

        } catch (error) {
            console.log(error)

        }

    }
    async getAll() {
        try {
            const file = await fs.promises.readFile(this.DirFile, 'utf-8')
            // console.log(JSON.parse(file))
            return JSON.parse(file)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteCartById(Id) {

        console.log(Id)
        try {
            const file = await fs.promises.readFile(this.DirFile, 'utf-8')
            console.log("id a borrar " + Id)
            const tex = JSON.parse(file)
            const Elegido = tex.filter(u => u.uuid != Id)


            await fs.promises.writeFile(this.DirFile, JSON.stringify(Elegido, null, 2))



        } catch (error) {
            console.log(error)

        }

    }
    async deleteProductFromCart(usuario, prodId) {
        try {
            // console.log(usuario)
            // console.log(prodId)
            const txt = await this.getAll();
            let txt2 = []
            await this.deleteCartById(usuario.uuid)
            const user = txt.find((u) => u.uuid == usuario.uuid)
            txt2 = txt.filter((u) => u.uuid != usuario.uuid)
            // console.log(user)
            const Compra = user.Compra.filter((u) => u.id != prodId)
            // console.log(Compra)
            if (Compra == null) {
                txt2.push({ usuario, Compra: [] })
                await fs.promises.writeFile(this.DirFile, JSON.stringify(txt2, null, 2))
            } else {
                usuario = { ...usuario, Compra: Compra }
                console.log("Eliminando")
                console.log(usuario)
                txt2.push(usuario)
                await fs.promises.writeFile(this.DirFile, JSON.stringify(txt2, null, 2))
            }


        } catch (err) {
            console.error(err)
        }
    }


}


// const reseña = new Contenedor(`Base_de_datos/Directorio_2.txt`)


// reseña.save({
//     "Autor": "John Green",
//     "Title": "Bajo la misma estrella",
//     "Sinopsis": "Dos adolecentes moribundos enamorados",
//     "Puntuacion": "5/10",
// })


// reseña.getById(1)
// reseña.getAll()
// reseña.deleteById(1)
// reseña.deleteAll()


// reseña.leerDirectorio()


module.exports = Contenedor