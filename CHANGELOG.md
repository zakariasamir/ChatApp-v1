# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-10-21

### ✨ Added

#### Frontend

- **UserItem Component**: Created new component to display online users with avatars and status indicators
- **Users Tab**: Implemented fully functional users tab navigation in sidebar
- **Tab Badges**: Added count badges showing number of rooms and online users
- **Character Counter**: Added message length counter in input field
- **Keyboard Shortcuts**: Added visual hints for Enter and Shift+Enter shortcuts
- **Empty States**: Enhanced empty state designs for rooms and users lists
- **Create Room Button**: Added quick create button in empty state
- **Message Read Receipts**: Visual indicators for sent and read messages
- **Custom Animations**: Added fadeIn animation for messages
- **Custom Scrollbars**: Styled scrollbars across the application
- **Loading States**: Improved loading indicators throughout the app

#### Backend

- **Error Handler Middleware**: Comprehensive error handling for all error types
- **Validation Middleware**: Input validation for auth, rooms, and messages
- **API Info Endpoint**: New `/api` endpoint showing API documentation
- **404 Handler**: Proper handling of undefined routes
- **Enhanced Logging**: Better server startup logs with emojis

### 🎨 Improved

#### Frontend UI/UX

- **Sidebar Design**:

  - Enhanced user profile section with better avatars
  - Improved connection status indicators
  - Added tab navigation with active states
  - Better empty states for rooms list

- **Room Items**:

  - Gradient backgrounds for active rooms
  - Icon-based room type indicators (# for public, 🔒 for private)
  - Hover effects and transitions
  - Better visual hierarchy

- **Chat Area**:

  - Beautiful welcome screen with animated elements
  - Enhanced chat header with gradients
  - Private room badges
  - Message count display with better styling

- **Message Bubbles**:

  - Modern rounded design with shadows
  - Gradient backgrounds for own messages
  - White cards for received messages
  - Avatar rings and shadows
  - Read receipt indicators
  - Better timestamp display

- **Message Input**:

  - Enhanced textarea with focus states
  - Gradient send button with hover effects
  - Scale animations on interaction
  - Shadow effects
  - Keyboard shortcut hints

- **Color Scheme**:
  - Consistent blue gradients throughout
  - Purple accents for user avatars
  - Better contrast ratios
  - Improved visual hierarchy

#### Backend

- **Route Organization**: Added validation middleware to all routes
- **Error Messages**: More descriptive and user-friendly error messages
- **API Responses**: Consistent response structure across all endpoints
- **Code Quality**: Better TypeScript types and interfaces

### 🐛 Fixed

- **Users Tab Issue**: Fixed non-functional users tab navigation
- **API Response Format**: Corrected backend response format mismatch (rooms, messages wrapped in objects)
- **TypeScript Errors**: Resolved all `any` type issues with proper interfaces
- **Image Optimization**: Replaced `<img>` tags with Next.js `<Image />` component
- **Tailwind Warnings**: Fixed deprecated Tailwind CSS class names
- **FileList SSR Issue**: Fixed server-side rendering error with FileList validation
- **UseEffect Dependencies**: Fixed missing dependencies warnings
- **Unused Variables**: Removed all unused imports and variables

### 🔧 Technical Changes

#### Frontend

- Added `ApiError` interface for better error handling
- Improved `ChatContext` with proper array initialization
- Enhanced `AuthContext` with graceful 401 handling
- Better TypeScript types across all components
- Improved form validation with Zod schemas
- Better error messages in forms

#### Backend

- Created `errorHandler.ts` middleware
- Created `validator.ts` middleware with comprehensive validation functions
- Updated all routes to use validation middleware
- Improved error handling in controllers
- Better MongoDB connection error handling
- Enhanced type safety throughout

### 📚 Documentation

- Created comprehensive README.md with:

  - Feature list
  - Installation instructions
  - API documentation
  - Socket events documentation
  - Project structure
  - Deployment guide

- Created CHANGELOG.md to track all changes

### 🚀 Performance

- Optimized images with Next.js Image component
- Improved component re-rendering with useCallback
- Better state management
- Reduced unnecessary API calls

---

## [1.0.0] - 2025-10-20

### Initial Release

- Basic chat functionality with Socket.IO
- User authentication with JWT
- Room-based messaging
- Real-time updates
- Basic UI with Tailwind CSS
- MongoDB integration
- Cloudinary image uploads
