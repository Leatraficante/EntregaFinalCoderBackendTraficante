const socket = io();

let user;
const chatBox = document.getElementById("chat");
const messagesLog = document.getElementById("messageLogs");

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa el usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir nombre de usuario";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      const message = chatBox.value;
      socket.emit("message", { user, message });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", data => {
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message}</br>`;
  });
  messagesLog.innerHTML = messages;
});

socket.on('newUserConnected', data => {
  if (user) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmationButton: false,
      timer: 3000, 
      title: `${data} se ha conectado al chat`,
      icon: 'success',
    })
  }
})
