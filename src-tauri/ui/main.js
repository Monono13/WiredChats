const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

let currentChat = "Chat 1"; // Chat seleccionado por defecto
const chats = {
  "Chat 1": [],
  "Chat 2": [],
  "Chat 3": []
};

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

function renderMessages() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Limpiar mensajes existentes
    const message = input.value.trim();

    if (message) {
      const messagesContainer = document.getElementById("messages");

      // Crear un nuevo elemento de mensaje
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.className = "message";

      // Agregar el mensaje al contenedor
      messagesContainer.appendChild(messageElement);

      // Limpiar el campo de entrada
      input.value = "";

      // Desplazar hacia abajo automáticamente
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
  }