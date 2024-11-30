import express from 'express';
import { db } from '../config/database.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM publications ORDER BY date DESC';
        const results = await db.query(query);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching publications:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM publications WHERE id = $1';
        const results = await db.query(query, [id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        
        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error('Error fetching publication:', error);
        res.status(500).json({ error: error.message });
    }
});

// Admin routes
router.post('/', adminAuth, async (req, res) => {
    try {
        const { title, description, date, image, author, category } = req.body.publication;
        const query = 'INSERT INTO publications (title, description, date, image, author, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const results = await db.query(query, [title, description, date, image, author, category]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, image, author, category } = req.body.publication;
        const query = 'UPDATE publications SET title = $1, description = $2, date = $3, image = $4, author = $5, category = $6 WHERE id = $7 RETURNING *';
        const results = await db.query(query, [title, description, date, image, author, category, id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        
        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error('Error updating publication:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM publications WHERE id = $1 RETURNING *';
        const results = await db.query(query, [id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        
        res.status(200).json({ message: 'Publication supprimée avec succès' });
    } catch (error) {
        console.error('Error deleting publication:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
