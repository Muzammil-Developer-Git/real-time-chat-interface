
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Load saved messages
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

// Display message
function displayMessage(message, time, sender) {
    const messageElement = document.createElement("div");

    messageElement.classList.add("message", sender);

    const messageText = document.createElement("div");
    messageText.textContent = message;

    const timeElement = document.createElement("small");
    timeElement.classList.add("message-time");
    timeElement.textContent = time;

    messageElement.appendChild(messageText);
    messageElement.appendChild(timeElement);

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Save messages
function saveMessages() {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Load messages
function loadMessages() {
    chatBox.innerHTML = "";

    messages.forEach(function(item) {
        displayMessage(item.text, item.time, item.sender);
    });
}

// Send user message
function sendMessage() {
    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const newMessage = {
        text: message,
        time: time,
        sender: "sent"
    };

    messages.push(newMessage);
    saveMessages();

    displayMessage(message, time, "sent");

    messageInput.value = "";

    // Chatbot response after 700 milliseconds
    setTimeout(function() {
        chatbotReply(message);
    }, 700);
}

// Chatbot replies
function chatbotReply(userMessage) {
    const message = userMessage.toLowerCase();

    let reply;

    if (message.includes("hello") || message.includes("hi")) {
        reply = "Hello! How can I help you?";
    }
    else if (message.includes("how are you")) {
        reply = "I am fine. Thank you!";
    }
    else if (message.includes("your name")) {
        reply = "I am your simple chatbot.";
    }
    else if (message.includes("help")) {
        reply = "Sure! What do you need help with?";
    }
    else if (message.includes("bye")) {
        reply = "Goodbye! Have a nice day.";
    }
    else {
        reply = "Sorry, I don't understand. Please try another message.";
    }

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const botMessage = {
        text: reply,
        time: time,
        sender: "received"
    };

    messages.push(botMessage);
    saveMessages();

    displayMessage(reply, time, "received");
}

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Show saved messages on page load
loadMessages();
