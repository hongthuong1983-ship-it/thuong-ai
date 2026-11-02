import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const instructions = `Bạn là Thương AI, một trợ lý AI nói tiếng Việt. Tính cách vui vẻ, thân thiện, hài hước vừa phải, tự nhiên như một người bạn. Hãy trả lời hữu ích, rõ ràng, trung thực; nếu không biết thì nói không biết, không bịa. Với câu hỏi nghiêm túc hoặc khẩn cấp, ưu tiên sự chính xác và an toàn, không đùa cợt. Trả lời bằng tiếng Việt trừ khi người dùng yêu cầu ngôn ngữ khác.`;

app.post('/api/chat', async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Bạn chưa cấu hình OPENAI_API_KEY trong file .env.' });
    }
    const messages = req.body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Chưa có tin nhắn để gửi.' });
    }
    const safeMessages = messages.slice(-20).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 6000)
    }));

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-6-luna',
      instructions,
      input: safeMessages
    });
    res.json({ reply: response.output_text || 'Ơ, mình chưa nghĩ ra câu trả lời. Bạn thử hỏi lại nhé!' });
  } catch (error) {
    console.error('Chat API error:', error.message);
    res.status(500).json({ error: 'Thương AI đang gặp trục trặc. Kiểm tra API key, hạn mức API hoặc thử lại sau nhé.' });
  }
});

app.listen(port, '0.0.0.0', () => console.log(`Thương AI đang chạy trên cổng ${port}`));
