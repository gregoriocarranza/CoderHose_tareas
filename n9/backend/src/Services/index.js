
const config = require("../../Database/Sql/dbconfig")
const knex = require('knex')(config)

class Contenedor {

    constructor(DirFile) {
        console.log("Easter egg")
    }

    async save(obj) {

        return new Promise((resolve, reject) => {
            // console.log(obj)
            knex.from("libros").insert(obj).then((data) => {
                // console.log(data)
                resolve(data)

            })
        })


    }

    async getById(Id) {

        try {
            return new Promise((resolve, reject) => {
                knex.from("libros").select("*").where("id", Id).then((data) => {
                    // console.log(data)
                    resolve(data)

                })
            })

        } catch (error) {
            console.log(error)

        }

    }
    async getAll() {
        try {
            return new Promise((resolve, reject) => {
                knex.from("libros").select("*").then((data) => {
                    // console.log(data)
                    resolve(data)

                })
            })


        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteById(Id) {

        console.log(Id)
        try {
            knex.from('libros').where({ id: Id }).del().then(() => {
                console.log("Eliminado")
            })
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
            return new Promise((resolve, reject) => {
                knex.from("libros").where("id", Obj.id).update(Obj).then((data) => {
                    console.log(data[0])
                    // resolve(data)

                })
            })


        } catch (error) {
            console.log(error)
        }

    }


}



module.exports = Contenedor