const socket = io.connect();


const EnviarLibro = () => {
    const Autor = document.querySelector('#Autor');
    const Titulo = document.querySelector('#Titulo');
    const Descripcion = document.querySelector('#Descripcion');
    const Ratio = document.querySelector('#Ratio');

    if (Autor.value == "" || Titulo.value == "" || Descripcion.value == "") {
        console.log("faltan datos")
        return false
    }
    const Libro = {
        Autor: Autor.value,
        Titulo: Titulo.value,
        Descripcion: Descripcion.value,
        Ratio: Ratio.value
    }
    console.log(Libro)
    socket.emit("client:enviarLibro", Libro)

    return false
}


socket.on('server:catchConect', status => {

    console.log(status)
    let init = `<tr>
    <th>Autor</th>
    <th>Titulo</th>
    <th>Descripcion</th>
    <th>Putuacion</th>
                </tr>`;
    document.getElementById('Bibliotecas').innerHTML = init;
})

socket.on("server:NuevaEntrada", Libro => {
    console.log(Libro)

    let Biblioteca = `<tr>
    <th>Autor</th>
    <th>Titulo</th>
    <th>Descripcion</th>
    <th>Putuacion</th>
                    </tr>`;

    Libro.forEach(u => {
        Biblioteca += `
        <tr>
                        <td>
                            ${u.Autor}
                        </td>
                        <td>
                            ${u.Titulo}
                        </td>
                        <td>
                           ${u.Descripcion}
                        </td>
                        <td>
                            ${u.Ratio}/10
                        </td>
                    </tr>`;
    });

    document.getElementById('Bibliotecas').innerHTML = Biblioteca;
})

