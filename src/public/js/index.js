const socket = io();

let user;
let chatBox = document.getElementById("chatBox")

swal.fire({
    tittle: 'Bienvenido a nuestro chat',
    input: 'text',
    text: 'ingresa por favor tu nombre',
    inputValidator: (value) => {
        return !value && 'se requiere un valor para continuar'
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value
})


chatBox.addEventListener('keyup', evt => {
    if (evt.key == "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", {
                user: user, message: chatBox.value
            });
            chatBox.value = '';
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`

    });
    log.innerHTML = messages
})
