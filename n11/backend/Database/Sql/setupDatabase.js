const config = require("./dbconfig.js")
const knex = require('knex')(config)

knex.schema.createTable('libros', table => {
    table.increments('id')
    table.string('Titulo')
    table.string('Autor')
    table.string('Descripcion')
    table.integer('Ratio')
    table.integer('Precio')
    table.boolean('Mostrar_Web')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.fn.now())

}).then(() => {
    console.log('Tabla creada')
}).catch((err) => {
    console.log(err)
}).finally(() => {
    knex.destroy()
})
knex.schema.createTable('user', table => {
    table.increments('id')
    table.string('uuid')
    table.string('Nombre')
    table.integer('Edad')
    table.boolean('Admin')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.fn.now())

}).then(() => {
    console.log('Tabla creada')
}).catch((err) => {
    console.log(err)
}).finally(() => {
    knex.destroy()
})

knex.schema.createTable('carritos', table => {
    table.increments('id')
    table.integer('userId')
    table.string('uuid')
    table.integer('Compra')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('update_at').defaultTo(knex.fn.now())

    // table.foreign('userId')
    //     .references('user.id')


}).then(() => {
    console.log('Tabla creada')
}).catch((err) => {
    console.log(err)
}).finally(() => {
    knex.destroy()
})

