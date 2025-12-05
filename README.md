# Auto Pro - Garage Management System

Full-stack application for auto garage management with E-Rickshaw sales, spare parts inventory, and service booking.

## Tech Stack

- **Frontend**: React + Vite, TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT with HTTP-only cookies

## Quick Start

### 1. MongoDB Atlas Setup (One-time)

1. Create free account at https://cloud.mongodb.com
2. Create a free M0 cluster
3. Create database user (Database Access)
4. Whitelist your IP (Network Access) or use `0.0.0.0/0` for development
5. Get connection string: **Connect → Drivers**

### 2. Configure Environment

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/autopro?retryWrites=true&w=majority
JWT_SECRET=autopro_secret_key_123!
```

### 3. Install & Run

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

The command automatically:
- Connects to MongoDB Atlas
- Seeds the database (first run)
- Starts backend (port 5000)
- Starts frontend (port 3000/3001)

## Access

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000

## Default Credentials

| Email | Password | Role |
|-------|----------|------|
| gauravdeepgd12007@gmail.com | 123456 | Admin |
| admin@autopro.com | 123456 | Admin |
| rajesh@example.com | 123456 | Customer |

## Features

✅ E-Rickshaw sales catalog  
✅ Spare parts inventory  
✅ Service appointment booking  
✅ User authentication  
✅ Admin dashboard  
✅ Dark mode theme toggle  
✅ Fully mobile responsive  

## Project Structure

```
auto-pro/
├── backend/
│   ├── config/        # Database connection
│   ├── controllers/   # Route handlers
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── data/          # Seed data
│   ├── middleware/    # Auth middleware
│   └── .env           # Environment variables
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── context/     # React context (Auth)
│       └── hooks/       # Custom hooks
└── package.json       # Root scripts
```

## Available Scripts

```bash
# Development
npm run dev              # Start both servers
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only

# Database
cd backend && npm run seed          # Reseed database
cd backend && npm run seed:destroy  # Clear database

# Production
npm start               # Build and serve production
```

## MongoDB Atlas Management

**View Data:**
1. Go to Atlas dashboard
2. Browse Collections
3. Select `autopro` database

**Backup:** Atlas provides automatic backups on free tier

## Mobile Responsive

Fully optimized for:
- 📱 Mobile phones (375px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## Troubleshooting

**Can't connect to database:**
- Verify Atlas connection string in `.env`
- Check IP whitelist in Atlas
- Ensure cluster is active (not paused)

**Seeding fails:**
```bash
cd backend
node seeder.js
```

**Port conflicts:**
- Backend: Change PORT in `backend/.env`
- Frontend: Vite auto-increments if 3000 is taken
