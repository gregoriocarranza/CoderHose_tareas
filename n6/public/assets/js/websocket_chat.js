const socket = io.connect();

const EnviarMensaje = () => {
    const Emisor = document.querySelector('#Emisor');
    const Emisor_mail = document.querySelector('#Email');
    const Mensaje = document.querySelector('#Mensaje');

    if (Emisor.value == "" || Emisor_mail.value == "" || Mensaje.value == "") {
        console.log("faltan datos")
        return false
    }
    const MensajeEnviado = {
        Emisor: Emisor.value,
        Emisor_mail: Emisor_mail.value,
        Mensaje: Mensaje.value
    }
    console.log(MensajeEnviado)
    socket.emit("client:enviarMensaje", MensajeEnviado)
    Mensaje.value = ""
    Mensaje.focus()
    return false
}
socket.on('server:catchConect', status => {

    console.log(status)
    let init = `<tr>
                    <th>Fecha</th>      
                    <th>Nombre</th>     
                    <th>Email</th>      
                    <th>Mensajes</th>       
                </tr>`;
    document.getElementById('Chat').innerHTML = init;
})

socket.on("server:NuevoMensaje", msj => {
    console.log(msj)

    let Chat = `<tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Mensajes</th>
                </tr>`;

    msj.forEach(u => {
        Chat += `
        <tr>
                        <td>
                            ${u.Date}
                        </td>
                        <td>
                            ${u.Emisor}
                            
                        </td>
                        <td>
                            ${u.Emisor_mail}
                        </td>
                        <td>
                            ${u.Mensaje}
                        </td>
                    </tr>`;
    });

    document.getElementById('Chat').innerHTML = Chat;
})

