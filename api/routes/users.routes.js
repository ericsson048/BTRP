import express from 'express';
import bcrypt from 'bcrypt';
import { db } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM users';
    
    try {
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, name, email, image, created_at, updated_at FROM users WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.post('/', async (req, res) => {
    const { name, email, password, image, role } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    try {
        // Check if email already exists
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
        const emailCheck = await db.query(checkEmailQuery, [email]);
        
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user
        const insertQuery = 'INSERT INTO users (name, email, password, image, role) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const result = await db.query(insertQuery, [name, email, hashedPassword, image, role]);
        
        res.status(201).json({ 
            message: 'User created successfully',
            userId: result.rows[0].id
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, image, role } = req.body;
    
    try {
        // Check if email exists and belongs to a different user
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1 AND id != $2';
        const emailCheck = await db.query(checkEmailQuery, [email, id]);
        
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        
        // Build the update query dynamically based on whether password is provided
        let query;
        let values;
        
        if (hashedPassword) {
            query = 'UPDATE users SET name = $1, email = $2, password = $3, image = $4, role = $5 WHERE id = $6';
            values = [name, email, hashedPassword, image, role, id];
        } else {
            query = 'UPDATE users SET name = $1, email = $2, image = $3, role = $4 WHERE id = $5';
            values = [name, email, image, role, id];
        }
        
        const results = await db.query(query, values);
        
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        
        res.status(200).json({ message: 'Utilisateur mis à jour' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé' });
    });
});

export default router;
