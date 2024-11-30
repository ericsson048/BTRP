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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, image } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const query = 'UPDATE users SET name = $1, email = $2, password = $3, image = $4 WHERE id = $5';
    
    db.query(query, [name, email, hashedPassword, image, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur mis à jour' });
    });
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
