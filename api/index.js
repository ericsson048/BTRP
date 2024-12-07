import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import publicationRoutes from './routes/publications.routes.js';
import projectRoutes from './routes/projects.routes.js';
import projectStackRoutes from './routes/project-stacks.routes.js';
import teamRoutes from './routes/team.routes.js';
import responsibilityRoutes from './routes/responsibilities.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3500;

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Essential Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for parsing form data
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Serve static files from the uploads directory
app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/publications', publicationRoutes);
app.use('/projects', projectRoutes);
app.use('/project-stacks', projectStackRoutes);
app.use('/team', teamRoutes);
app.use('/responsibilities', responsibilityRoutes);
app.use('/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Upload directory: ${path.join(__dirname, 'uploads', 'images')}`);
});