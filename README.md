# 🚗 Auto Pro - Garage Management System

A full-stack web application for managing a garage business that specializes in two-wheeler services, E-Rickshaw sales, and spare parts.

![Auto Pro](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## ✨ Features

### Customer Features
- 🌓 **Dark/Light Mode** - Toggle between themes with persistent preference
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🛵 **E-Rickshaw Catalog** - Browse available E-Rickshaws with detailed specifications
- 🔧 **Spare Parts Shop** - View and explore genuine spare parts inventory
- 📅 **Appointment Booking** - Schedule service appointments online
- 📞 **Contact Integration** - WhatsApp chat and Google Maps integration
- ℹ️ **About Section** - Learn about services and team

### Admin Features
- 🔐 **Secure Authentication** - JWT-based auth with HTTP-only cookies
- 📊 **Admin Dashboard** - Manage products, view appointments
- ➕ **Product Management** - Add, edit, and delete products
- 📝 **Appointment Management** - View and manage customer appointments
- 👥 **User Management** - Admin and customer role management

## 🛠️ Tech Stack

### Frontend
- **React** 18.3 - UI library
- **React Router** 7.1 - Navigation
- **Vite** 7.2 - Build tool
- **Tailwind CSS** 3.4 - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18 - Web framework
- **MongoDB** - Database
- **Mongoose** 7.6 - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
auto-pro/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── data/            # Seed data
│   ├── middleware/      # Auth & admin middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   └── vercel.json      # Vercel config
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── assets/      # Images, etc.
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Root component
│   │   └── main.jsx     # Entry point
│   └── index.html       # HTML template
└── DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/GauravDeep25/Auto-Pro.git
cd Auto-Pro
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**

Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Seed the database (optional)**
```bash
cd backend
npm run seed
```

5. **Run the application**
```bash
# From root directory
npm run dev
```

This starts both frontend (port 3000) and backend (port 5000) concurrently.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📦 Deployment on Vercel

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy Steps

1. **Push to GitHub**
```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

2. **Deploy Backend to Vercel**
   - Import repository
   - Set root directory to `backend`
   - Add environment variables (NODE_ENV, PORT, MONGO_URI, JWT_SECRET)
   - Deploy

3. **Deploy Frontend to Vercel**
   - Import repository
   - Set root directory to `frontend`
   - Add `VITE_API_URL` environment variable
   - Deploy

4. **Update CORS**
   - Add frontend URL to backend CORS settings
   - Redeploy backend

## 🔐 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Appointments
- `GET /api/appointments` - Get all appointments (Admin)
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment (Admin)
- `DELETE /api/appointments/:id` - Delete appointment (Admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/profile` - Get user profile

## 🧪 Testing

Access admin dashboard:
- Email: `admin@autopro.com`
- Password: `admin123`

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

**Gaurav Deep**
- GitHub: [@GauravDeep25](https://github.com/GauravDeep25)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, create an issue in the repository.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Hosting by [Vercel](https://vercel.com/)

---

Made with ❤️ for Auto Pro Garage
