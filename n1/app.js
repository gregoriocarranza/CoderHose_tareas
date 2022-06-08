class Persona {
    constructor(nombre, apellidos) {
        this.nombre = nombre
        this.apellidos = apellidos
        this.libros = []
        this.mascotas = []
    }

    getUserData() {
        this.getFullName();
        console.log(`Te voy a contar un poco sobre mi:`);
        console.log(`Tengo ${this.countMascotas()} mascotas y soy fanatico de los libros!`);

        console.log(`En mi coleccion tengo estos libros:`)
        console.log(`--------------------------`)
        this.getBookNames()
    }

    getFullName() {
        console.log("--------------------------------------")
        console.log(`Hola, mi nombre es: ${this.nombre} ${this.apellidos}`);
        console.log()
    }

    addMascota(data) {
        this.mascotas.push(data);

    }

    addBook(libro, escritor, puntuacion) {
        this.libros.push({ libro: libro, escritor: escritor, puntuacion: puntuacion });
    }

    countMascotas() {
        return this.mascotas.length;
    }

    getBookNames() {
        for (let i = 0; i < this.libros.length; i++) {
            console.log(`-${this.libros[i]["libro"]}`);
            console.log(`El escritor es ${this.libros[i]["escritor"]}`);
            console.log(`te lo recomiendo con una puntuacion de ${this.libros[i]["puntuacion"]}`);
            console.log()
        }
    }

}


// create tu usuario
const newPersona = new Persona("Gregorio", "Carranza torres", {}, {})


// Añade mascotas
newPersona.addMascota("rita");
newPersona.addMascota("roco");
newPersona.addMascota("zoe");
newPersona.addMascota("octavio (hermano)");



// Añade tu coleccion de libros
newPersona.addBook("Bajo la misma estrella", "John Green", "5/10");
newPersona.addBook("El niño del pijama de rayas", "John Boyne", "7/10");
newPersona.addBook("El curioso incidente del perro a medianoche", "Mark Haddon", "12/10");

// Retornar data
newPersona.getUserData();






