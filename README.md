# 🎬 Ọleoflix - Netflix-Style Video Streaming Platform

A full-stack Netflix clone built with the MERN stack (MongoDB, Express, React, Node.js) featuring video streaming, user authentication, personalized recommendations, and a responsive Netflix-style UI.

## 🚀 Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Run the deployment script
./deploy.sh
```

📖 For detailed deployment instructions, please see [README-DEPLOYMENT.md](./README-DEPLOYMENT.md)

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based authentication
- User registration and login
- Protected routes
- User profiles with customization
- Subscription tiers

### 🎥 Video Streaming
- Custom HTML5 video player
- Multiple quality options (360p, 480p, 720p, 1080p, 4K)
- Subtitle support (multiple languages)
- Resume playback from where you left off
- Progress tracking and watch history
- Fullscreen mode
- Volume controls
- Skip forward/backward (5 seconds)

### 🎯 Personalization
- Collaborative filtering recommendation engine
- Genre-based recommendations
- "Continue Watching" with progress indicators
- "My List" feature to save videos
- Watch history tracking
- Personalized homepage

### 🎨 Netflix-Style UI
- Hero banner with featured content
- Horizontal scrolling carousels
- Hover previews on video cards
- Genre rows (Action, Comedy, Drama, etc.)
- Trending section
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions

### 🔍 Additional Features
- Video search functionality
- Genre filtering
- Similar content recommendations
- View count tracking
- Mobile-friendly design

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Video hosting (ready to integrate)
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling (Netflix theme)

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn
- Cloudinary account (for video hosting)

## 🚀 Quick Start

### 1. Clone the repository

\`\`\`bash
cd /Users/leooladimu1984/x/netflix-clone
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
\`\`\`

Edit `.env` with your configuration:

\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Cloudinary (sign up at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
\`\`\`

Start MongoDB (if running locally):
\`\`\`bash
mongod
\`\`\`

Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

Server runs on http://localhost:5000

### 3. Frontend Setup

Open a new terminal:

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Frontend runs on http://localhost:5173

### 4. Access the Application

Open http://localhost:5173 in your browser

## 📁 Project Structure

\`\`\`
netflix-clone/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── videoController.js    # Video CRUD
│   │   └── recommendationController.js
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Video.js              # Video schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── videoRoutes.js
│   │   └── recommendationRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar/
    │   │   ├── VideoCard/
    │   │   ├── VideoRow/
    │   │   └── VideoPlayer/      # Custom video player
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state
    │   ├── pages/
    │   │   ├── Home/             # Main page
    │   │   ├── Login/
    │   │   ├── Register/
    │   │   ├── Watch/            # Video player page
    │   │   ├── MyList/
    │   │   └── Profile/
    │   ├── utils/
    │   │   └── api.js            # Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
\`\`\`

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Videos
- `GET /api/videos` - Get all videos (with filters)
- `GET /api/videos/:id` - Get single video
- `GET /api/videos/featured` - Get featured videos
- `GET /api/videos/trending` - Get trending videos
- `GET /api/videos/genre/:genre` - Get videos by genre
- `POST /api/videos` - Create video (protected)
- `POST /api/videos/:id/watch` - Add to watch history (protected)
- `POST /api/videos/:id/mylist` - Toggle My List (protected)

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations (protected)
- `GET /api/recommendations/similar/:id` - Get similar videos

## 🎥 Video Hosting with Cloudinary

### Setup Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Dashboard
3. Add to `.env` file

### Upload Videos

Example video object structure:

\`\`\`javascript
{
  title: "Sample Movie",
  description: "A great movie",
  videoUrl: "https://res.cloudinary.com/your-cloud/video/upload/sample-video.mp4",
  thumbnail: "https://res.cloudinary.com/your-cloud/image/upload/thumbnail.jpg",
  duration: 7200, // seconds
  genre: ["Action", "Thriller"],
  quality: [
    { resolution: "1080p", url: "video-1080p.mp4" },
    { resolution: "720p", url: "video-720p.mp4" }
  ],
  subtitles: [
    { language: "en", url: "subtitles-en.vtt" },
    { language: "es", url: "subtitles-es.vtt" }
  ],
  releaseYear: 2024,
  rating: "PG-13"
}
\`\`\`

### Sample Data Seeder (Optional)

Create `backend/seeder.js`:

\`\`\`javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const sampleVideos = [
  {
    title: "Action Movie",
    description: "An epic action adventure",
    videoUrl: "your-cloudinary-url",
    thumbnail: "your-thumbnail-url",
    duration: 7200,
    genre: ["Action"],
    releaseYear: 2024,
    rating: "PG-13",
    featured: true
  }
  // Add more...
];

const seedData = async () => {
  await Video.deleteMany();
  await Video.insertMany(sampleVideos);
  console.log('Data seeded!');
  process.exit();
};

seedData();
\`\`\`

Run: `node backend/seeder.js`

## 🎨 Customization

### Change Theme Colors

Edit `frontend/src/index.css`:

\`\`\`css
:root {
  --netflix-red: #e50914;
  --netflix-black: #141414;
  --netflix-dark: #0b0b0b;
  --netflix-gray: #808080;
}
\`\`\`

### Add More Genres

Update `backend/models/Video.js`:

\`\`\`javascript
genre: [{
  type: String,
  enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 
         'Thriller', 'Documentary', 'Animation', 'Fantasy', 'YOUR_GENRE']
}]
\`\`\`

## 📱 Mobile Responsive

The app is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- Environment variables for secrets

## 🚀 Production Deployment

### Backend (Fly.io/Heroku/Railway)

\`\`\`bash
# Build command
npm install

# Start command
npm start
\`\`\`

### Frontend (Vercel/Netlify)

\`\`\`bash
# Build command
npm run build

# Output directory
dist
\`\`\`

### Environment Variables

Set all `.env` variables in your hosting platform.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### CORS Errors
- Verify `CLIENT_URL` in backend `.env`
- Check CORS configuration in `server.js`

### Video Not Playing
- Verify Cloudinary URLs
- Check video format (MP4 recommended)
- Ensure CORS is enabled on Cloudinary

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Cloudinary API](https://cloudinary.com/documentation)

## ⭐ Features Coming Soon

- [ ] Admin dashboard
- [ ] Content upload interface
- [ ] Advanced search filters
- [ ] User reviews and ratings
- [ ] Download for offline viewing
- [ ] Multiple user profiles
- [ ] Parental controls
- [ ] Watch parties (synchronized viewing)

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Streaming! 🍿**
