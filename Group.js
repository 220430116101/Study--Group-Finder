// Initialize Lucide icons
lucide.createIcons();

// Initial messages data
const messages = [
  { id: 1, text: 'Hey There!!', sender: 'other', username: 'John' },
  { id: 2, text: 'How are you?', sender: 'other', username: 'John' },
  { id: 3, text: 'Study time?', sender: 'other', username: 'Sarah' },
  { id: 4, text: '10 AM?', sender: 'self', username: 'You' },
  { id: 5, text: 'Sure!', sender: 'other', username: 'Sarah' }
];

// Active group tracking
let activeGroup = 'Code Masters';

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
  
  const username = document.createElement('div');
  username.className = 'username';
  username.style.fontSize = '12px';
  username.style.marginBottom = '4px';
  username.style.color = message.sender === 'self' ? '#fff' : '#666';
  username.textContent = message.username;
  
  const messageText = document.createElement('div');
  messageText.textContent = message.text;
  
  messageBubble.appendChild(username);
  messageBubble.appendChild(messageText);
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
      sender: 'self',
      username: 'You'
    });
    messageInput.value = '';
    renderMessages();
  }
}

// Function to handle group selection
function selectGroup(groupName) {
  // Remove active class from all groups
  document.querySelectorAll('.group-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to selected group
  const selectedGroup = Array.from(document.querySelectorAll('.group-item'))
    .find(item => item.textContent === groupName);
  if (selectedGroup) {
    selectedGroup.classList.add('active');
  }
  
  // Update header
  document.querySelector('.chat-header h2').textContent = groupName;
  activeGroup = groupName;
}

// Event listener for Enter key in message input
document.getElementById('messageInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Event listeners for group items
document.querySelectorAll('.group-item').forEach(item => {
  item.addEventListener('click', () => selectGroup(item.textContent));
});

// Search functionality
document.querySelector('.search-input').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  document.querySelectorAll('.group-item').forEach(item => {
    const groupName = item.textContent.toLowerCase();
    item.style.display = groupName.includes(searchTerm) ? 'block' : 'none';
  });
});

// Initial setup
selectGroup('Code Masters');
renderMessages();