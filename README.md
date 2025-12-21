# 🤖 AI Chatbot (Real-Time)

A real-time AI-powered chatbot built using **Node.js**, **Socket.IO**, and **Google Gemini API**.  
The chatbot supports instant messaging with AI responses and is designed with a **separate frontend and backend architecture**.

---

## 🚀 Features

- 🔄 Real-time chat using Socket.IO
- 🧠 AI-powered responses (Google Gemini)
- 📁 Clean frontend & backend separation
- 🔐 Secure API key handling with environment variables
- ⚡ Fast and lightweight backend
- 🧩 Easy to extend and customize

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- Socket.IO
- Google Gemini API
- dotenv

### Frontend
- React (JavaScript)
- Socket.IO Client

---

## 📂 Project Structure

ai-chatbot/
│
├── backend/
│ ├── server.js
│ ├── socket/
│ ├── controllers/
│ ├── .env
│ ├── package.json
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── App.js
│ ├── package.json
│
├── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-chatbot.git
cd ai-chatbot
2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

GEMINI_API_KEY=your_gemini_api_key
PORT=3000


Start the backend server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🔌 Socket.IO Flow

User sends message from frontend

Message is sent to backend via Socket.IO

Backend sends prompt to Gemini API

AI response is emitted back to frontend in real time

🧪 Testing

Ensure backend is running before starting frontend

Open frontend in browser

Send messages and receive AI responses instantly

📌 Environment Variables
Variable	Description
GEMINI_API_KEY	Google Gemini API key
PORT	Backend server port
🌱 Future Enhancements

User authentication

Chat history storage

Typing indicators

Multiple AI model support

UI improvements

👩‍💻 Author

Rakhi Singh
CSE Student | Backend & Full Stack Developer
✨ Passionate about AI & real-time systems
