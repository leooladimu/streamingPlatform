# 🎬 Ọleoflix

A full-stack Netflix-style video streaming platform built with the MERN stack. Features JWT authentication, personalized recommendations, a custom HTML5 video player, and a fully responsive Netflix-style UI.

**Live:** [oleoflix.oleo.dev](https://oleoflix.oleo.dev)

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs  
**Frontend:** React 18, React Router, Axios, Vite  
**Infrastructure:** Fly.io (backend), Vercel (frontend), MongoDB Atlas

---

## Local Development

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

Server runs on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

---

## Project Structure

```
streamingPlatform/
├── package.json
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── videoController.js
│   │   └── recommendationController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Video.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── videoRoutes.js
│   │   └── recommendationRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── fly.toml
│   └── Dockerfile
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── utils/
    ├── index.html
    ├── vercel.json
    └── vite.config.js
```

---

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/profile` | Protected |

### Videos
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/videos` | Public |
| GET | `/api/videos/featured` | Public |
| GET | `/api/videos/trending` | Public |
| GET | `/api/videos/genre/:genre` | Public |
| GET | `/api/videos/:id` | Public |
| POST | `/api/videos` | Protected |
| POST | `/api/videos/:id/watch` | Protected |
| POST | `/api/videos/:id/mylist` | Protected |

### Recommendations
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/recommendations` | Protected |
| GET | `/api/recommendations/similar/:id` | Public |

### Health
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/health` | Public |

---

## Seeding the Database

```bash
cd backend
node seed.js
```

This will clear and re-populate the database with sample videos.

---

## Deployment

### Backend (Fly.io)

```bash
cd backend
fly secrets set NODE_ENV=production MONGODB_URI=... JWT_SECRET=... JWT_EXPIRE=30d CLIENT_URL=https://oleoflix.oleo.dev
fly deploy
```

The `fly.toml` is already configured with `auto_stop_machines = 'off'` and `min_machines_running = 1` to prevent cold starts.

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

---

## License

MIT
