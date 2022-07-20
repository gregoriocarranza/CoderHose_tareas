const express = require('express')
const Product_Service = require("../Services/index")
const { faker } = require("@faker-js/faker")

class Product_Route {
    constructor(app) {
        this.app = app
        this.Router = express.Router()
        this.app.use('/api/productos', this.Router)
        this.container = new Product_Service
        this.Router.get(`/`, this.Get_all_products)
        this.Router.post(`/`, this.Post_Product)
        this.Router.put(`/`, this.Update_Product)
        this.Router.delete(`/:id`, this.Delete_Product)

        this.Router.get(`/4testing`, this.Test)

    }
    Get_all_products = async (req, res) => {

        try {
            this.container.getAll()
                .then((data) => {
                    // console.log(data)
                    res.send(data)
                })

        } catch (err) {
            console.err(err)
        }

    }

    Post_Product = async (req, res) => {
        try {
            console.log(req.body)
            this.container.save(req.body).then(txt => {
                res.status(200).json({ sucsess: true, txt })
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
    Update_Product = async (req, res) => {
        try {
            // console.log(req.body)

            this.container.Update(req.body)
            res.status(200).json({ sucsess: true })


        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
    Delete_Product = async (req, res) => {
        try {
            const ID = req.params.id
            // console.log(ID)

            const resp = await this.container.deleteById(ID)
            res.status(200).json({ sucsess: true })



        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
    Test = async (req, res) => {

        let obj = []
        let indexOfObj = 5
        for (let index = 0; index <= indexOfObj; index++) {
            const testObj = {
                Autor: faker.name.firstName(),
                Titulo: faker.commerce.productName(),
                Descripcion: faker.commerce.productDescription(),
                Ratio: faker.commerce.price(0, 10, 0),
                Precio: faker.commerce.price(100, 500, 0),
                Mostrar_Web: false
            }
            this.container.save(testObj)
            obj.push(testObj)
        }
        res.status(200).json({ sucsess: true, message: "Objetos creados: " + indexOfObj, obj })
    }
}

module.exports = Product_Route