
const config = require("../../Database/dbconfig")
const knex = require('knex')(config)
const DirAux = []

class Contenedor {

    constructor(DirFile) {
        this.DirFile = DirFile
    }

    async save(obj) {

        return new Promise((resolve, reject) => {
            // console.log(obj)
            knex.from("carritos").insert(obj).then((data) => {
                // console.log(data)
                resolve(obj)

            })
        })

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
            return new Promise((resolve, reject) => {
                knex.from("carritos").select("*").where("id", Id).then((data) => {
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
                knex.from("carritos").select("*").then((data) => {
                    // console.log(data)
                    resolve(data)

                })
            })


        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteCartById(Id) {

        console.log(Id)
        try {
            knex.from('carritos').where({ uuid: Id }).del().then(() => {
                console.log("Eliminado")
            })
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

module.exports = Contenedor