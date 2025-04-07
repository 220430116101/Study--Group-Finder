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
  // messageText.textContent = message.text;

  if (message.file) {
    // Display file link
    const fileLink = document.createElement("a");
    fileLink.href = URL.createObjectURL(message.file);
    fileLink.textContent = message.file.name;
    fileLink.target = "_blank";
    messageText.appendChild(fileLink);
} else {
    // Display text message
    messageText.textContent = message.text;
}
  
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

// Toggle upload options popup
document.querySelector('.upload-button').addEventListener('click', function () {
  const uploadContainer = document.querySelector('.upload-button-container');
  uploadContainer.classList.toggle('active');
});

// Close popup when an option is selected
function closeUploadOptions() {
  document.querySelector('.upload-button-container').classList.remove('active');
}

// Upload option handlers
function uploadPhoto() {
  closeUploadOptions();
  alert('Photo upload functionality coming soon!');
}

function uploadDocument() {
  closeUploadOptions();
  alert('Document upload functionality coming soon!');
}

function uploadVideo() {
  closeUploadOptions();
  alert('Video upload functionality coming soon!');
}

function uploadOtherFiles() {
  closeUploadOptions();
  alert('Other files upload functionality coming soon!');
}

// Initial setup
selectGroup('Code Masters');
renderMessages();



// Sagar Edits:
// Function to handle file uploads
function handleFileUpload(type) {
  const input = document.createElement("input");
  input.type = "file";

  // Set accepted file types based on the upload type
  if (type === "photo") {
      input.accept = "image/*"; // Accept only images
  } else if (type === "document") {
      input.accept = ".pdf,.doc,.docx,.txt"; // Accept common document formats
  } else if (type === "video") {
      input.accept = "video/*"; // Accept only videos
  } else {
      input.accept = "*"; // Accept all file types
  }

  // Trigger file selection dialog
  input.click();

  // Handle file selection
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        // Add the file to the messages array
        messages.push({
            id: messages.length + 1,
            file: file, // Add the file object
            sender: "self", // Mark as sent by the user
            username: "You"
        });

        // Re-render messages to display the uploaded file
        renderMessages();
    }
});
}

// Upload option handlers
function uploadPhoto() {
  handleFileUpload("photo");
}

function uploadDocument() {
  handleFileUpload("document");
}

function uploadVideo() {
  handleFileUpload("video");
}

function uploadOtherFiles() {
  handleFileUpload("other");
}