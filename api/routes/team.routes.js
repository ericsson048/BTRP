import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

// Routes pour les membres de l'équipe
router.post('/', async (req, res) => {
    const { name, title, image_url, facebook, github, instagram } = req.body;
    const query = 'INSERT INTO team_members (name, title, image_url, facebook, github, instagram) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    
    db.query(query, [name, title, image_url, facebook, github, instagram], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, name, title, image_url, facebook, github, instagram });
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM team_members';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM team_members WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Membre non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, title, image_url, facebook, github, instagram } = req.body;
    const query = 'UPDATE team_members SET name = $1, title = $2, image_url = $3, facebook = $4, github = $5, instagram = $6 WHERE id = $7';
    
    db.query(query, [name, title, image_url, facebook, github, instagram, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Membre non trouvé' });
        }
        res.status(200).json({ message: 'Membre mis à jour' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM team_members WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Membre non trouvé' });
        }
        res.status(200).json({ message: 'Membre supprimé' });
    });
});

export default router;
