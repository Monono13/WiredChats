// Variable para llevar la cuenta de las sesiones creadas
let sessionCount = 1;
// Objeto para almacenar los mensajes de cada sesión
const chats = {};

// Función para crear una nueva sesión de chat
function createChatSession() {
  // Solicita al usuario un nombre para la nueva sesión o asigna un nombre predeterminado
  const sessionName = prompt("Ingrese el nombre de la nueva sesión:") || `Chat ${sessionCount + 1}`;
  sessionCount++;

  // Crea una nueva pestaña para la sesión
  const tab = document.createElement("li");
  tab.textContent = sessionName;
  tab.setAttribute("data-session", sessionCount);
  document.getElementById("session-tabs").appendChild(tab);

  // Crea un nuevo contenedor de chat para la sesión
  const chatContainer = document.createElement("main");
  chatContainer.className = "chat-container";
  chatContainer.setAttribute("data-session", sessionCount);

  // Encabezado del chat que muestra el nombre de la sesión
  const header = document.createElement("header");
  header.className = "chat-header";
  header.innerHTML = `<h2>${sessionName}</h2>`;

  // Contenedor para los mensajes de la sesión
  const messagesDiv = document.createElement("div");
  messagesDiv.id = `messages-${sessionCount}`;
  messagesDiv.className = "messages";

  // Contenedor para la entrada de mensajes y el botón de enviar
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const input = document.createElement("input");
  input.id = `message-input-${sessionCount}`;
  input.type = "text";
  input.placeholder = "Escribe un mensaje...";

  const sendButton = document.createElement("button");
  sendButton.id = `send-button-${sessionCount}`;
  sendButton.textContent = "Enviar";

  // Agrega el campo de entrada y el botón al contenedor de entrada
  inputContainer.appendChild(input);
  inputContainer.appendChild(sendButton);

  // Agrega el encabezado, los mensajes y el contenedor de entrada al contenedor de chat
  chatContainer.appendChild(header);
  chatContainer.appendChild(messagesDiv);
  chatContainer.appendChild(inputContainer);

  // Agrega el contenedor de chat al área principal de sesiones
  document.getElementById("chat-sessions").appendChild(chatContainer);

  // Inicializa el almacenamiento de mensajes para la nueva sesión
  chats[`messages-${sessionCount}`] = [];

  // Agrega un evento al botón de enviar para manejar el envío de mensajes
  sendButton.addEventListener("click", () => {
    const message = input.value.trim();
    if (message) {
      chats[`messages-${sessionCount}`].push(message);
      renderMessages(`messages-${sessionCount}`);
      input.value = "";
    }
  });

  // Agrega un evento a la pestaña para cambiar a la sesión correspondiente
  tab.addEventListener("click", () => switchSession(sessionCount));

  // Cambia automáticamente a la nueva sesión
  switchSession(sessionCount);
}

// Función para cambiar entre sesiones de chat
function switchSession(sessionId) {
  // Oculta todas las sesiones de chat y desactiva todas las pestañas
  document.querySelectorAll(".chat-container").forEach((container) => {
    container.classList.remove("active");
  });
  document.querySelectorAll("#session-tabs li").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Muestra la sesión seleccionada y activa su pestaña
  const activeContainer = document.querySelector(`.chat-container[data-session="${sessionId}"]`);
  const activeTab = document.querySelector(`#session-tabs li[data-session="${sessionId}"]`);

  if (activeContainer && activeTab) {
    activeContainer.classList.add("active");
    activeTab.classList.add("active");
  } else {
    console.error(`Session ${sessionId} not found.`);
  }
}

// Función para renderizar los mensajes en el contenedor correspondiente
function renderMessages(chatId) {
  const messagesContainer = document.getElementById(chatId);
  messagesContainer.innerHTML = "";
  chats[chatId].forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = "message";
    messagesContainer.appendChild(messageElement);
  });
  // Asegura que el scroll esté al final para mostrar los mensajes más recientes
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Inicializa la aplicación cuando el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", () => {
  // Inicializa la primera sesión de chat
  chats["messages-1"] = [];

  // Agrega un evento al botón de enviar de la primera sesión
  document.getElementById("send-button-1").addEventListener("click", () => {
    const input = document.getElementById("message-input-1");
    const message = input.value.trim();
    if (message) {
      chats["messages-1"].push(message);
      renderMessages("messages-1");
      input.value = "";
    }
  });

  // Agrega un evento al botón para crear nuevas sesiones
  document.getElementById("add-session-button").addEventListener("click", createChatSession);

  // Agrega un evento a la pestaña inicial para cambiar a la primera sesión
  document.querySelector(".session-tabs li").addEventListener("click", () => switchSession(1));
});