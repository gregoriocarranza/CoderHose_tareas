const Product_Service = require("../src/Services/index")

const Productos = new Product_Service
let ProductIdTest = 0
test("Creacion de producto", async () => {
    const testObj = {
        Autor: 'Test Jest',
        Titulo: 'Me',
        Descripcion: 'A easy Test',
        Ratio: '100',
        Precio: '0',
        Mostrar_Web: false
    }
    const data = await Productos.save(testObj)
    ProductIdTest = data.data
    expect(data).toStrictEqual({ message: "Exito en la creacion del objeto", status: 200, data: ProductIdTest })
})

test("Modificacion de producto", async () => {
    const testObj2 = {
        id: ProductIdTest,
        Autor: 'Test Jest Update',
        Titulo: 'Me too',
        Descripcion: 'A easy Test of update',
        Ratio: '100',
        Precio: '0',
        Mostrar_Web: false
    }
    const data = await Productos.Update(testObj2)
    expect(data).toStrictEqual({ message: "Exito en la modificacion del objeto", status: 200 })
})

test("Eliminacion de producto", async () => {

    const data = await Productos.deleteById(ProductIdTest)
    expect(data).toStrictEqual({ message: "Exito en la eliminacion del objeto", status: 200 })
})