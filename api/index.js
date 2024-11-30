import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import publicationRoutes from './routes/publications.routes.js';
import projectRoutes from './routes/projects.routes.js';
import projectStackRoutes from './routes/project-stacks.routes.js';
import teamRoutes from './routes/team.routes.js';
import responsibilityRoutes from './routes/responsibilities.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3500;

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/publications', publicationRoutes);
app.use('/projects', projectRoutes);
app.use('/project-stacks', projectStackRoutes);
app.use('/team', teamRoutes);
app.use('/responsibilities', responsibilityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});