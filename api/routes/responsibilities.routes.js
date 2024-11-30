import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { team_member_id, responsibility } = req.body;
    const query = 'INSERT INTO responsibilities (team_member_id, responsibility) VALUES ($1, $2) RETURNING id';
    
    db.query(query, [team_member_id, responsibility], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, team_member_id, responsibility });
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM responsibilities';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM responsibilities WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Responsabilité non trouvée' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { team_member_id, responsibility } = req.body;
    const query = 'UPDATE responsibilities SET team_member_id = $1, responsibility = $2 WHERE id = $3';
    
    db.query(query, [team_member_id, responsibility, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Responsabilité non trouvée' });
        }
        res.status(200).json({ message: 'Responsabilité mise à jour' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM responsibilities WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Responsabilité non trouvée' });
        }
        res.status(200).json({ message: 'Responsabilité supprimée' });
    });
});

export default router;
