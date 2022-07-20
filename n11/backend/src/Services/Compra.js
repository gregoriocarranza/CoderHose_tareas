
const config = require("../../Database/Sql/dbconfig")
const knex = require('knex')(config)
const DirAux = []

const CartModel = require("../../Database/mongoDb/cartModel")

class Contenedor {

    constructor(DirFile) {
        this.DirFile = DirFile
    }

    async save(obj) {

        return new Promise((resolve, reject) => {
            console.log(obj)
            const Cart = new CartModel({ userId: null, uuid: obj.uuid, productos: [], date: new Date().toISOString() })

            Cart.save().then(doc => {
                console.log("Dato insertado correctamente ", doc._id.toString().split(" "))
                console.log(doc)
                resolve(doc)


            }).catch(err => {
                console.log("Error al insertar en database", err.message)
            })

        })

    }
    async AddProduct(data) {
        try {
            // console.log(data)

            CartModel.findByIdAndUpdate({ _id: data.id }, { $push: { productos: data.compra } })
                .then(doc => {
                    // console.log("Producto añadido")
   

                })
                .catch((err) => {
                    console.log("Error al actualizar elementos", err.message)

                })
        } catch (err) {
            console.log(err)

        }

    }
    async getById(Id) {

        // console.log(Id)
        try {
            return new Promise((resolve, reject) => {
                CartModel.findOne({ _id: Id }, (err, existe) => {
                    if (existe) {
                        // console.log("existe")
                        resolve(existe)
                    } else {
                        console.log("no existe")
                    }
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
            // knex.from('carritos').where({ uuid: Id }).del().then(() => {  /*Elimina de SQL */
            //     console.log("Eliminado")
            // })
            CartModel.findByIdAndDelete({ _id: Id })
                .then(doc => {
                    console.log("Carrito eliminado")
                })
                .catch((err) => {
                    console.log("Error al eliminar elementos", err.message)
                })
        } catch (error) {
            console.log(error)

        }

    }
    async deleteProductFromCart(id, prodId) {
        try {
            CartModel.findOne({ _id: id })
                .then(doc => {
                    // console.log(doc.productos)
                    const productosDeseados = doc.productos.filter(u => u.id != prodId)
                    CartModel.findByIdAndUpdate({ _id: id }, { $set: { productos: productosDeseados } })
                        .then(doc => {
                            // console.log("Producto eliminado")
                        })
                        .catch((err) => {
                            console.log("Error al eliminar elementos", err.message)


                        })
                })
                .catch((err) => {
                    console.log("Error al buscar elementos", err.message)

                })
        } catch (err) {
            console.error(err)
        }
    }


}

module.exports = Contenedor