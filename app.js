const chat = document.getElementById('chat');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
let messages = [];

function addMessage(role, content, extraClass = '') {
  document.getElementById('welcome')?.remove();
  const row = document.createElement('div');
  row.className = `message ${role} ${extraClass}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'B' : '✦';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = content;
  row.append(avatar, bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
  return row;
}

async function sendMessage(text) {
  const clean = text.trim();
  if (!clean || sendBtn.disabled) return;
  messages.push({ role: 'user', content: clean });
  addMessage('user', clean);
  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;
  const loading = addMessage('assistant', 'Thương AI đang nghĩ câu trả lời… 💭', 'typing');
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    const data = await response.json();
    loading.remove();
    if (!response.ok) throw new Error(data.error || 'Không gửi được tin nhắn.');
    messages.push({ role: 'assistant', content: data.reply });
    addMessage('assistant', data.reply);
  } catch (error) {
    loading.remove();
    addMessage('assistant', `Ối! ${error.message}`);
    messages.pop();
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(input.value);
});
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
});
clearBtn.addEventListener('click', () => {
  messages = [];
  chat.innerHTML = `<div class="welcome" id="welcome"><div class="big-logo">✦</div><h2>Cuộc trò chuyện mới! ✨</h2><p>Thương AI đã sẵn sàng. Hôm nay mình giúp gì cho bạn đây?</p></div>`;
  input.focus();
});
document.querySelectorAll('.suggestion').forEach((button) => {
  button.addEventListener('click', () => sendMessage(button.textContent));
});
