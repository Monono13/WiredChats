let sessionCount = 1;
const chats = {};

function createChatSession() {
  const sessionName = prompt("Ingrese el nombre de la nueva sesión:") || `Chat ${sessionCount + 1}`;
  sessionCount++;

  // Add new tab
  const tab = document.createElement("li");
  tab.textContent = sessionName;
  tab.setAttribute("data-session", sessionCount);
  document.getElementById("session-tabs").appendChild(tab);

  // Add new chat container
  const chatContainer = document.createElement("main");
  chatContainer.className = "chat-container";
  chatContainer.setAttribute("data-session", sessionCount);

  const header = document.createElement("header");
  header.className = "chat-header";
  header.innerHTML = `<h2>${sessionName}</h2>`;

  const messagesDiv = document.createElement("div");
  messagesDiv.id = `messages-${sessionCount}`;
  messagesDiv.className = "messages";

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const input = document.createElement("input");
  input.id = `message-input-${sessionCount}`;
  input.type = "text";
  input.placeholder = "Escribe un mensaje...";

  const sendButton = document.createElement("button");
  sendButton.id = `send-button-${sessionCount}`;
  sendButton.textContent = "Enviar";

  inputContainer.appendChild(input);
  inputContainer.appendChild(sendButton);

  chatContainer.appendChild(header);
  chatContainer.appendChild(messagesDiv);
  chatContainer.appendChild(inputContainer);

  document.getElementById("chat-sessions").appendChild(chatContainer);

  chats[`messages-${sessionCount}`] = [];

  sendButton.addEventListener("click", () => {
    const message = input.value.trim();
    if (message) {
      chats[`messages-${sessionCount}`].push(message);
      renderMessages(`messages-${sessionCount}`);
      input.value = "";
    }
  });

  tab.addEventListener("click", () => switchSession(sessionCount));

  switchSession(sessionCount);
}

function switchSession(sessionId) {
  // Remove active class from all chat containers and tabs
  document.querySelectorAll(".chat-container").forEach((container) => {
    container.classList.remove("active");
  });
  document.querySelectorAll("#session-tabs li").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Add active class to the selected chat container and tab
  const activeContainer = document.querySelector(`.chat-container[data-session="${sessionId}"]`);
  const activeTab = document.querySelector(`#session-tabs li[data-session="${sessionId}"]`);

  if (activeContainer && activeTab) {
    activeContainer.classList.add("active");
    activeTab.classList.add("active");
  } else {
    console.error(`Session ${sessionId} not found.`);
  }
}

function renderMessages(chatId) {
  const messagesContainer = document.getElementById(chatId);
  messagesContainer.innerHTML = "";
  chats[chatId].forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = "message";
    messagesContainer.appendChild(messageElement);
  });
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

window.addEventListener("DOMContentLoaded", () => {
  chats["messages-1"] = [];

  document.getElementById("send-button-1").addEventListener("click", () => {
    const input = document.getElementById("message-input-1");
    const message = input.value.trim();
    if (message) {
      chats["messages-1"].push(message);
      renderMessages("messages-1");
      input.value = "";
    }
  });

  document.getElementById("add-session-button").addEventListener("click", createChatSession);

  document.getElementById("session-tabs").addEventListener("click", (event) => {
    const tab = event.target;
    if (tab.tagName === "LI" && tab.hasAttribute("data-session")) {
      const sessionId = parseInt(tab.getAttribute("data-session"), 10);
      switchSession(sessionId);
    }
  });

  document.querySelector(".session-tabs li").addEventListener("click", () => switchSession(1));
});