# AI Image Enhancer 🪄

A simple web application that automatically enhances image quality using AI.

## 🚀 How It Works

1. **Upload**: Upload an image through the frontend.
2. **Process**: The backend sends the image to the AI enhancement service.
3. **Preview**: View the enhanced image side-by-side with your original image.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js (Node.js)
- **AI API**: TechHK / PicWish Visual Scale API

## ⚡ Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
API_KEY=your_api_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

