const messageList = document.getElementById('message-list');
const chatStatus = document.getElementById('chat-status');

function addMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageList.appendChild(messageElement);
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws');
  ws.onopen = () => {
    console.log('Connected');
    chatStatus.style.backgroundColor = 'green';
  };

  ws.onclose = () => {
    console.log('Disconnected');
    chatStatus.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  };

  ws.onmessage = (event) => {
    console.log('Message from server', event.data);
    const { type, data } = JSON.parse(event.data);
    if (type === 'reply') {
      addMessage(data.user.name, data.msg);
    }
  };
}

connect();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#chat-input');
  // addMessage(input.value);
  ws.send(input.value);
  input.value = '';
})