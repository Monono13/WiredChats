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

  // Contenedor para los mensajes de la sesión
  const messagesDiv = document.createElement("div");
  messagesDiv.id = `messages-${sessionCount}`;
  messagesDiv.className = "messages";

  // Agrega el contenedor de mensajes al contenedor de chat
  chatContainer.appendChild(messagesDiv);

  // Agrega el contenedor de chat al área principal de sesiones
  document.getElementById("chat-sessions").appendChild(chatContainer);

  // Inicializa el almacenamiento de mensajes para la nueva sesión
  chats[`messages-${sessionCount}`] = [];

  // Usar el contenedor de entrada existente en el HTML
  const inputContainer = document.querySelector(".input-container");
  const input = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

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

// Actualiza el título de la sesión activa
function updateSessionTitle(sessionName) {
  const titleElement = document.getElementById("active-session-title");
  titleElement.textContent = sessionName;
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

    // Actualiza el título de la sesión activa
    updateSessionTitle(activeTab.textContent);

    // Limpia el campo de entrada
    document.getElementById("message-input").value = "";
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

// Asegura que los eventos estén correctamente vinculados y depurados
window.addEventListener("DOMContentLoaded", () => {
  // Inicializa la primera sesión de chat
  chats["messages-1"] = [];

  // Vincula el botón de enviar mensaje al campo de entrada global
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", () => {
    const input = document.getElementById("message-input");
    const message = input.value.trim();
    const activeSession = document.querySelector(".chat-container.active");

    if (message && activeSession) {
      const sessionId = activeSession.getAttribute("data-session");
      if (!chats[`messages-${sessionId}`]) {
        chats[`messages-${sessionId}`] = [];
      }
      chats[`messages-${sessionId}`].push(message);
      renderMessages(`messages-${sessionId}`);
      input.value = "";
    }
  });

  // Asegura que el botón de agregar sesión esté correctamente vinculado
  const addSessionButton = document.getElementById("add-session-button");
  if (addSessionButton) {
    addSessionButton.addEventListener("click", () => {
      createChatSession();
    });
  } else {
    console.error("No se encontró el botón de agregar sesión en el DOM.");
  }

  // Asegura que las pestañas sean clicables y cambien correctamente
  const sessionTabs = document.getElementById("session-tabs");
  sessionTabs.addEventListener("click", (event) => {
    const clickedTab = event.target;
    if (clickedTab.tagName === "LI" && clickedTab.hasAttribute("data-session")) {
      const sessionId = parseInt(clickedTab.getAttribute("data-session"), 10);
      switchSession(sessionId);
    }
  });
});