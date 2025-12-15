# ChatApp Frontend

A modern real-time chat application frontend built with Next.js, TypeScript, and Socket.IO.

## Features

- 🔐 User authentication (login/register)
- 💬 Real-time messaging with Socket.IO
- 🏠 Room-based chat system
- 👥 Online user status
- ⌨️ Typing indicators
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.IO Client
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Backend API running on port 5004

### Installation

1. Install dependencies:

```bash
yarn install
```

2. Create environment variables:

```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:5004/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5004
```

4. Start the development server:

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── chat/              # Chat-related components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   └── ChatContext.tsx    # Chat state
├── lib/                   # Utility libraries
│   ├── api.ts             # API client
│   ├── socket.ts          # Socket.IO client
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Form validation schemas
└── types/                 # TypeScript type definitions
    └── index.ts           # Main type definitions
```

## API Integration

The frontend integrates with the backend API through:

- **Authentication**: JWT-based auth with HTTP-only cookies
- **Real-time**: Socket.IO for live messaging and typing indicators
- **REST API**: Axios for CRUD operations

### Key Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `GET /api/messages/room/:roomId` - Get room messages

### Socket Events

- `room:join` - Join a room
- `room:leave` - Leave a room
- `message:room` - Send/receive room messages
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `user:online` - User comes online
- `user:offline` - User goes offline

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

1. Build the application:

```bash
yarn build
```

2. Start the production server:

```bash
yarn start
```

Or deploy to platforms like Vercel, Netlify, or any Node.js hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
