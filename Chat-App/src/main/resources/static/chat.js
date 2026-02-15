'use strict';

const usernamePage = document.querySelector('#username-page');
const chatPage = document.querySelector('#chat-page');
const usernameForm = document.querySelector('#username-page #join-btn');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#message');
const messageArea = document.querySelector('#message-area');
const statusElement = document.querySelector('#connection-status');

let stompClient = null;
let username = null;

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        const socket = new SockJS('http://localhost:8080/chat');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    // 講読（Subscribe）の設定
    stompClient.subscribe('/topic/messages', onMessageReceived);

    statusElement.textContent = 'オンライン';
    statusElement.classList.replace('opacity-75', 'text-success');
}

function onError(error) {
    statusElement.textContent = '接続エラー';
    statusElement.classList.add('text-danger');
}

function sendMessage(event) {
    const messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageInput.value,
        };

        stompClient.send("/app/send-message", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (message.sender === username) {
        messageElement.classList.add('message-sent');
    } else {
        messageElement.classList.add('message-received');

        // 他人の場合は名前を表示
        const usernameElement = document.createElement('div');
        usernameElement.classList.add('user-name');
        usernameElement.textContent = message.sender;
        messageArea.appendChild(usernameElement);
    }

    const textElement = document.createElement('span');
    textElement.textContent = message.content;
    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

document.querySelector('#join-btn').addEventListener('click', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
