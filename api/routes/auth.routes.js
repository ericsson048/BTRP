import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { createError } from '../utils/Error.js';
import cookieParser from 'cookie-parser';
import { sendPasswordResetEmail,sendWelcomeEmail } from '../services/emailService.js';

const router = express.Router();
router.use(cookieParser());

router.post("/authentification", async (req, res) => {
    const { name, email, image } = req.body;
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const existingUser = await db.query(query, [email]);

        let user;
        let isNewUser = false;
        if (existingUser.rows.length > 0) {
            user = existingUser.rows[0];
        } else {
            const insertQuery = "INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *";
            const result = await db.query(insertQuery, [name, email, image]);
            user = result.rows[0];
            isNewUser = true;
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, role:user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send welcome email for new users
        if (isNewUser) {
            try {
                await sendWelcomeEmail(email, name);
            } catch (emailError) {
                console.error("Error sending welcome email:", emailError);
                // Don't block the registration process if email fails
            }
        }

        return res.status(200).json({ 
            message: "Authentification réussie",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Erreur lors de l'authentification:", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

router.post("/sign-in", async (req, res) => {
    const { name, email, password, image } = req.body;    

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        // Check if email already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4) RETURNING id';
        
        const results = await db.query(query, [name, email, hashedPassword, image]);
        
        // Send welcome email
        try {
            await sendWelcomeEmail(email, name);
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Don't block the registration process if email fails
        }

        res.status(201).json({ id: results.rows[0].id, name, email, image });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Password reset request route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Aucun compte associé à cet email.' });
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Store reset token in database
        await db.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [resetToken, new Date(Date.now() + 3600000), email]
        );

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken);

        res.json({ message: 'Email de réinitialisation envoyé.' });
    } catch (error) {
        console.error('Error in forgot-password:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email de réinitialisation.' });
    }
});

router.post('/login', async (req, res, next) => {
    const body = req.body;
    const query1 = 'SELECT * FROM users WHERE name = $1 and email = $2';
    
    try {
        const result = await db.query(query1, [body.name, body.email]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Mauvais mot de passe"));

        const token = jwt.sign({ id: user.id, role:user.role }, process.env.JWT_SECRET);
        const { password, ...otherDetails } = user;
        
        res.cookie("access_token", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).json({ 
            message: "Authentification réussie",
            details: { 
                ...otherDetails,
                role: user.role
            },
            success: true 
        });
    } catch (error) {
        next(error);
    }
});

router.post("/check-admin", async (req, res) => {
    
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(401).json({ message: "Non autorisé - Email manquant" });
        }

        const query = 'SELECT role FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        
        if (!result.rows[0] || result.rows[0].role !== 'admin') {
            return res.status(403).json({ message: "Non autorisé - Accès administrateur requis" });
        }

        res.status(200).json({ message: "Accès autorisé", role: result.rows[0].role });
    } catch (error) {
        console.error('Erreur de vérification admin:', error);
        res.status(401).json({ message: "Non autorisé" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: "Déconnexion réussie" });
});

export default router;
