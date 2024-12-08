import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { project_id, name } = req.body;
    const query = `
        WITH inserted_stack AS (
            INSERT INTO project_stacks (project_id, name) 
            VALUES ($1, $2) 
            RETURNING *
        )
        SELECT 
            s.*,
            p.title as "project.title"
        FROM inserted_stack s
        JOIN projects p ON p.id = s.project_id
    `;
    
    db.query(query, [project_id, name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results.rows[0]);
    });
});

router.get('/', (req, res) => {
    const query = `
        SELECT 
            ps.*,
            p.title as "project.title"
        FROM 
            project_stacks ps
            JOIN projects p ON p.id = ps.project_id
        ORDER BY 
            ps.id DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            ps.*,
            p.title as "project.title"
        FROM 
            project_stacks ps
            JOIN projects p ON p.id = ps.project_id
        WHERE 
            ps.id = $1
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Stack de projet non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, name } = req.body;
    const query = `
        WITH updated_stack AS (
            UPDATE project_stacks 
            SET project_id = $1, name = $2 
            WHERE id = $3 
            RETURNING *
        )
        SELECT 
            s.*,
            p.title as "project.title"
        FROM updated_stack s
        JOIN projects p ON p.id = s.project_id
    `;
    
    db.query(query, [project_id, name, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Stack de projet non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM project_stacks WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Stack de projet non trouvé' });
        }
        res.status(200).json({ message: 'Stack de projet supprimé' });
    });
});

export default router;
