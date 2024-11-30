import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { num, category, title, description, img, live, github } = req.body;
    const query = 'INSERT INTO projects (num, category, title, description, img, live, github) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    
    db.query(query, [num, category, title, description, img, live, github], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, num, category, title, description, img, live, github });
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM projects';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM projects WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { num, category, title, description, img, live, github } = req.body;
    const query = 'UPDATE projects SET num = $1, category = $2, title = $3, description = $4, img = $5, live = $6, github = $7 WHERE id = $8';
    
    db.query(query, [num, category, title, description, img, live, github, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json({ message: 'Projet mis à jour' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM projects WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json({ message: 'Projet supprimé' });
    });
});

export default router;
