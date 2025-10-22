# ChatApp - Real-Time Chat Application

A modern, full-stack real-time chat application built with React, Next.js, Socket.IO, Node.js, and MongoDB.

## 🚀 Features

### 💬 Real-Time Communication

- **Instant messaging** with Socket.IO
- **Online/offline status** indicators
- **Typing indicators** (framework ready)
- **Room-based chat** and private messaging support

### 🎨 Modern UI/UX

- **Beautiful, responsive design** with Tailwind CSS
- **Smooth animations** and transitions
- **Gradient backgrounds** and modern color schemes
- **Custom scrollbars** for better aesthetics
- **Tab navigation** between Rooms and Users
- **Message read receipts** (visual indicators)

### 🔐 Authentication & Security

- **JWT-based authentication** with HTTP-only cookies
- **Bcrypt password hashing**
- **Input validation** middleware
- **Protected routes** and API endpoints
- **Profile pictures** with Cloudinary integration

### 🏠 Room Management

- **Create public/private rooms**
- **Join multiple rooms**
- **Room descriptions**
- **Visual room indicators** (public/private)

### 👥 User Management

- **User profiles** with avatars
- **Online user list**
- **User search** and discovery
- **Profile customization**

### 🛠️ Technical Features

- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **Socket.IO** for WebSocket connections
- **React Hook Form** with Zod validation
- **Context API** for state management
- **Axios** for HTTP requests
- **Error handling** middleware
- **API validation** middleware

## 📁 Project Structure

```
MiniProjectRealTimeChatApp/
├── chatapp-api-v1/           # Backend API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── middlewares/      # Custom middlewares
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Socket.IO service
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utility functions
│   │   └── server.ts         # Server entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
└── chatapp-platform-v1/      # Frontend Application
    ├── src/
    │   ├── app/              # Next.js app directory
    │   ├── components/       # React components
    │   │   ├── auth/         # Authentication components
    │   │   ├── chat/         # Chat interface components
    │   │   └── layout/       # Layout components
    │   ├── contexts/         # React contexts
    │   ├── lib/              # Utilities & API
    │   ├── types/            # TypeScript types
    │   └── styles/           # Global styles
    ├── .env.local            # Environment variables
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Yarn or npm
- Cloudinary account (for image uploads)

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd chatapp-api-v1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```env
   SERVER_PORT=5004
   CLIENT_URL=http://localhost:3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5004`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd chatapp-platform-v1
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Create `.env.local` file:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5004/api
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5004
   ```

4. **Start the development server:**
   ```bash
   yarn dev
   ```

The frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Rooms

- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room

### Messages

- `GET /api/messages/room/:roomId` - Get room messages
- `POST /api/messages/room/:roomId` - Send room message
- `GET /api/messages/private/:userId` - Get private messages
- `POST /api/messages/private/:userId` - Send private message

### Health

- `GET /api/health` - Health check
- `GET /api` - API information

## 🔌 Socket Events

### Client → Server

- `room:join` - Join a chat room
- `room:leave` - Leave a chat room
- `message:room` - Send room message
- `message:private` - Send private message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator

### Server → Client

- `user:online` - User comes online
- `user:offline` - User goes offline
- `message:room` - Receive room message
- `message:private` - Receive private message
- `typing:start` - User starts typing
- `typing:stop` - User stops typing

## 🎯 Key Improvements Made

### Backend

✅ Added comprehensive **error handling** middleware  
✅ Implemented **input validation** middleware  
✅ Enhanced **API responses** with consistent structure  
✅ Added **404 handler** for undefined routes  
✅ Improved **server logging** with emojis  
✅ Created **API info endpoint** for documentation

### Frontend

✅ **Fixed users tab** navigation issue  
✅ Created **UserItem component** for online users display  
✅ Enhanced **UI with gradients** and modern design  
✅ Added **smooth animations** and transitions  
✅ Improved **message bubbles** with read receipts  
✅ Enhanced **message input** with character counter  
✅ Added **tab badges** showing room/user counts  
✅ Implemented **custom scrollbars**  
✅ Added **keyboard shortcuts** hints  
✅ Improved **empty states** with better UX  
✅ Fixed **image optimization** with Next.js Image  
✅ Enhanced **color schemes** and visual hierarchy

## 🧪 Testing

### Backend Testing

```bash
cd chatapp-api-v1
npm test
```

### Frontend Testing

```bash
cd chatapp-platform-v1
yarn test
```

## 🚢 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (e.g., Vercel, Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Zakar

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Next.js for the React framework
- Tailwind CSS for styling
- MongoDB for database
- Cloudinary for image hosting

---

**Happy Chatting! 💬**
