import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';

export const adminAuth = async (req, res, next) => {
    try {
        
        const { email } = req.body;
        if (!email) {
            console.log("No email found in request body");
            return res.status(401).json({ message: "Non autorisé - Email manquant" });
        }

        // Check if user is admin directly from database
        const query = 'SELECT role FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        console.log("Database role check result:", result.rows[0]);
        
        if (!result.rows[0] || result.rows[0].role !== 'admin') {
            console.log("User is not admin according to database");
            return res.status(403).json({ message: "Non autorisé - Accès administrateur requis" });
        }

        req.user = { email, role: result.rows[0].role };
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        res.status(401).json({ message: "Non autorisé" });
    }
};
