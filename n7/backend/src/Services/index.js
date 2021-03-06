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

        const NewObj = { ...obj, id: newID }
        await txt.push(NewObj)
        try {
            await fs.promises.writeFile(this.DirFile, JSON.stringify(txt, null, 2))
            console.log("Archivo Escrito con exito")
            return (NewObj)

        } catch (error) {

        }



    }

    async getById(Id) {

        try {
            console.log(Id)
            const file = await fs.promises.readFile(this.DirFile, 'utf-8')
            const tex = JSON.parse(file)

            const Elegido = tex.find(u => u.id === Id)
            console.log(Elegido)
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

    async deleteById(Id) {


        try {
            const file = await fs.promises.readFile(this.DirFile, 'utf-8')

            const tex = JSON.parse(file)
            const Elegido = tex.filter(u => u.id != Id)


            await fs.promises.writeFile(this.DirFile, JSON.stringify(Elegido, null, 2))



        } catch (error) {
            console.log(error)

        }

    }
    async deleteAll() {

        try {
            await fs.promises.writeFile(this.DirFile, JSON.stringify([], null, 2))
            console.log("Items eliminados")
            const txt = await this.getAll();
        } catch (error) {
            console.log(error)
        }

    }
    async Update(Obj) {

        try {
            if (Obj.id) {
                console.log(Obj)
                await this.deleteById(Obj.id)
                const txt = await this.getAll();
                console.log(txt)
                await txt.push(Obj)
                await fs.promises.writeFile(this.DirFile, JSON.stringify(txt, null, 2))

            } else {
                console.log("no existe id")
                return
            }


        } catch (error) {
            console.log(error)
        }

    }

    async leerDirectorio() {
        await fs.promises.readdir("Base_de_datos").then(Directorio => {
            console.log(Directorio)

        }).catch(err => {
            console.log(err)
        })

    }


}


// const rese??a = new Contenedor(`Base_de_datos/Directorio_2.txt`)


// rese??a.save({
//     "Autor": "John Green",
//     "Title": "Bajo la misma estrella",
//     "Sinopsis": "Dos adolecentes moribundos enamorados",
//     "Puntuacion": "5/10",
// })


// rese??a.getById(1)
// rese??a.getAll()
// rese??a.deleteById(1)
// rese??a.deleteAll()


// rese??a.leerDirectorio()


module.exports = Contenedor