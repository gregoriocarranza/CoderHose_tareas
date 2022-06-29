const express = require('express')
const Product_Service = require("../Services/Compra")
const fs = require("fs")


class Cart_Route {
    constructor(app) {
        this.app = app
        this.Router = express.Router()
        this.app.use('/api/carrito', this.Router)
        this.container = new Product_Service()

        this.Router.post(`/`, this.Create_cart)
        this.Router.delete(`/:user`, this.Delete_cart_by_uuid)
        this.Router.get(`/:id/prod`, this.Get_all_products)
        this.Router.post(`/:id/prod`, this.Add_to_cart)
        this.Router.delete(`/:id/prod/:prodId`, this.Delete_product_from_cart)

    }
    Get_all_products = async (req, res) => {
        const { id } = req.params

        try {
            this.container.getById(id)
                .then((data) => {
                    console.log(data)
                    res.send(data)
                })
        } catch (err) {
            console.error(err)
        }
    }

    Add_to_cart = async (req, res) => {

        try {
            const obj = req.body
            const { id } = req.params

            let datas = {}
            datas = { id, compra: obj }
            // await this.container.getById(id).then((txt) => {
            // console.log(txt)})

            await this.container.AddProduct(datas).then((data) => {
                // console.log(data)
            })

        } catch (error) {

        }

    }
    Create_cart = async (req, res) => {
        try {
            const Uuid = req.body
            console.log(Uuid)
            this.container.save(Uuid).then(txt => {
                res.status(200).json({ sucsess: true, txt, Uuid })
            })

        } catch (error) {

        }
    }
    Delete_cart_by_uuid = async (req, res) => {

        try {
            const { user } = req.params

            console.log(user)


            await this.container.deleteCartById(user).then((u) => {
                // console.log(u)
            })
            res.status(200).json({ sucsess: true })

        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }


    }
    Delete_product_from_cart = async (req, res) => {

        try {
            const { id, prodId } = req.params
            // console.log(JSON.parse(id))
            // console.log(prodId)
            const a = JSON.parse(id)
            const user = {
                uuid: a.uuid,
                id: a.id
            }
            // console.log(user)
            await this.container.deleteProductFromCart(user, prodId)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Cart_Route