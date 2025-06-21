window.addEventListener("DOMContentLoaded", () => {
  let sessionCount = 1;
  const chats = {};

  function createChatSession() {
    sessionCount++;
    const chatContainer = document.createElement("main");
    chatContainer.className = "chat-container";
    chatContainer.setAttribute("data-session", sessionCount);

    const header = document.createElement("header");
    header.className = "chat-header";
    header.innerHTML = `<h2>Chat ${sessionCount}</h2>`;

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
});