# 🚀 Quick Start Guide

Get your ChatApp running in 5 minutes!

## 📋 Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Cloudinary account created
- [ ] Git installed

## ⚡ Quick Setup

### 1. Clone & Install (2 minutes)

```bash
# Navigate to project
cd MiniProjectRealTimeChatApp

# Install backend dependencies
cd chatapp-api-v1
npm install

# Install frontend dependencies
cd ../chatapp-platform-v1
yarn install
```

### 2. Configure Environment (2 minutes)

**Backend** (`chatapp-api-v1/.env`):

```env
SERVER_PORT=5004
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-super-secret-key-change-this
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend** (`chatapp-platform-v1/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5004/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5004
```

### 3. Start Servers (1 minute)

**Terminal 1 - Backend:**

```bash
cd chatapp-api-v1
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd chatapp-platform-v1
yarn dev
```

### 4. Access Application

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5004/api
- ❤️ **Health Check**: http://localhost:5004/api/health

## 🎯 First Steps

1. **Register** a new account
2. **Upload** a profile picture (optional)
3. **Create** your first room
4. **Start** chatting!

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Make sure MongoDB is running
mongod
```

### Port Already in Use

```bash
# Change ports in .env files
SERVER_PORT=5005  # Backend
# Frontend will ask to use port 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install  # or yarn install
```

### Cloudinary Upload Issues

- Verify your Cloudinary credentials
- Check API key permissions
- Ensure cloud name is correct

## 📱 Testing the App

1. Open two browser windows
2. Register two different users
3. Create a room in one window
4. Join the same room in the other window
5. Send messages back and forth
6. Watch real-time updates!

## 🎨 Key Features to Try

- ✅ Switch between Rooms and Users tabs
- ✅ Create public and private rooms
- ✅ See online users in real-time
- ✅ Send messages with Enter key
- ✅ Watch typing indicators (coming soon)
- ✅ See read receipts on messages
- ✅ Upload profile pictures

## 💡 Pro Tips

- Use **Shift + Enter** for new lines in messages
- Click on users to start private chats (coming soon)
- Create rooms with descriptive names
- Check the character counter when typing
- Watch for online/offline status indicators

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CHANGELOG.md](CHANGELOG.md) for version history
- Review [IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md) for all enhancements

## 🆘 Need Help?

- Check the backend logs for API errors
- Check the browser console for frontend errors
- Review the comprehensive READMEs
- Verify all environment variables are set

## 🚀 Ready to Deploy?

Check the Deployment section in [README.md](README.md) for production deployment instructions.

---

**Happy Chatting! 💬**
