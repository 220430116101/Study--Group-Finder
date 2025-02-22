// Initialize Lucide icons
lucide.createIcons();

// Initial messages data
const messages = [
  { id: 1, text: 'Hey There!!', sender: 'other' },
  { id: 2, text: 'How are you?', sender: 'other' },
  { id: 3, text: 'Study time?', sender: 'other' },
  { id: 4, text: '10 AM?', sender: 'self' },
  { id: 5, text: 'Sure!', sender: 'other' }
];

// Function to create a message element
function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.sender}`;

  if (message.sender === 'other') {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    const avatarIcon = document.createElement('i');
    avatarIcon.setAttribute('data-lucide', 'user');
    avatar.appendChild(avatarIcon);
    messageDiv.appendChild(avatar);
  }

  const messageBubble = document.createElement('div');
  messageBubble.className = 'message-bubble';
  messageBubble.textContent = message.text;
  messageDiv.appendChild(messageBubble);

  return messageDiv;
}

// Function to render all messages
function renderMessages() {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';
  messages.forEach(message => {
    messagesContainer.appendChild(createMessageElement(message));
  });
  // Re-initialize Lucide icons for new messages
  lucide.createIcons();
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to send a new message
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const text = messageInput.value.trim();

  if (text) {
    messages.push({
      id: messages.length + 1,
      text: text,
      sender: 'self'
    });
    messageInput.value = '';
    renderMessages();
  }
}

// Event listener for Enter key in message input
document.getElementById('messageInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});     

// Initial render
renderMessages();