const express = require('express')
const Product_Service = require("../Services/index")


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

            this.container.deleteById(ID)
            res.status(200).json({ sucsess: true })



        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
}

module.exports = Product_Route