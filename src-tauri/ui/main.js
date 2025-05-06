const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("message-input");
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
    }
  });
});
