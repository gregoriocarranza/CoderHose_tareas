
const express = require('express')
const fs = require("fs")
const Contenedor = require("../Services/index")


class Product_Route {
    constructor(app) {
        this.app = app
        this.Router = express.Router()
        this.container = new Contenedor(`Base_de_datos/Directorio_2.txt`)
        this.app.use('/api/productos', this.Router)
        this.Router.get(`/`, this.Get_all_products)
        this.Router.get(`/:id`, this.Get_by_id)
        this.Router.post(`/`, this.Post_Product)
        this.Router.put(`/:id`, this.Update_Product)
        this.Router.delete(`/:id`, this.Delete_Product)
    }

    Get_all_products = async (req, res) => {
        try {
            const ReadData = await fs.promises.readFile("./Base_de_datos/Directorio_2.txt", 'utf-8')
            let Data = JSON.parse(ReadData)
            // console.log(Data)
            res.status(200).json({ sucsess: true, Data })
        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false, Error: "No se pueden traer los produc" })
        }
    }
    Get_by_id = async (req, res) => {
        try {
            const ID = req.params.id
            let ReadData = await fs.promises.readFile("./Base_de_datos/Directorio_2.txt", 'utf-8')
            let Data = JSON.parse(ReadData)
            const Selected = Data.find(U => U.id == ID)
            if (!Selected) {
                res.status(500).json({ sucsess: false, Error: "Producto no encontrado" })
                return
            }
            // console.log(Selected)
            res.status(200).json({ sucsess: true, Selected })
        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
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

            const id = parseInt(req.params.id)
            
            // this.container.deleteById(ID)
            this.container.Update({ ...req.body, id })
            res.status(200).json({ sucsess: true })


        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
    Delete_Product = async (req, res) => {
        try {
            const ID = req.params.id
            this.container.deleteById(ID).then(txt => {
                console.log("Item Eliminado")
            })
            res.status(200).json({ sucsess: true })

        } catch (err) {
            console.log(err)
            res.status(500).json({ sucsess: false })
        }
    }
}

module.exports = Product_Route