# PutPlanner

PutPlanner is a comprehensive golf lesson booking platform that connects golfers with professional instructors. The platform makes golf bookings easy for all ages and skill levels, providing a seamless experience for finding and booking golf lessons.

## Features

- **Golf Lesson Booking**: Book lessons with professional golf instructors
- **Instructor Management**: Browse and select from available instructors
- **Club Directory**: Find golf clubs and facilities by location
- **User Authentication**: Secure login with Google OAuth integration
- **Interactive Maps**: Location-based search using Mapbox integration
- **Availability Management**: Real-time instructor availability and scheduling
- **Dashboard**: Personal dashboard for managing bookings and profile

## Tech Stack

### Frontend

- **Next.js 14** - React framework
- **React 18** - UI library
- **NextUI** - Component library
- **Tailwind CSS** - Styling
- **Mapbox GL** - Interactive maps
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

## Project Structure

```
PutPlanner/
├── backend/                 # Express.js API server
│   ├── config/             # Configuration files
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── server.js           # Main server file
├── frontend/               # Next.js application
│   ├── public/             # Static assets
│   └── src/
│       └── app/            # Next.js app directory
│           ├── components/ # Reusable components
│           ├── hooks/      # Custom React hooks
│           ├── booking/    # Booking pages
│           ├── browse/     # Browse functionality
│           ├── club/       # Club pages
│           ├── dashboard/  # User dashboard
│           └── login/      # Authentication
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Copy the environment variables from the documentation
   - Configure MongoDB connection string
   - Set up Google OAuth credentials
   - Configure JWT secret

4. Start the server:

```bash
node server.js
```

The backend server will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Configure API endpoints
   - Set up Google OAuth client ID
   - Configure Mapbox access token

4. Start the development server:

```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/putplanner
PORT=5001
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## API Endpoints

### Authentication

- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile

### Instructors

- `GET /instructors` - Get all instructors
- `GET /instructors/:id` - Get instructor by ID
- `GET /instructors/:id/availability` - Get instructor availability

### Clubs

- `GET /clubs` - Get all clubs
- `GET /clubs/:id` - Get club by ID

### Bookings

- `GET /bookings` - Get all bookings
- `POST /bookings` - Create new booking
- `GET /bookings/user/:userId` - Get user bookings

## Development

### Available Scripts

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**

- `node server.js` - Start the server

## License

This project is licensed under the ISC License.
