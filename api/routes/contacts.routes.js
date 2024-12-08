import express from 'express';
import { db } from '../config/database.js';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

// Get all contact messages
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des messages'
        });
    }
});

// Get unread messages count
router.get('/unread', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT COUNT(*) FROM contacts WHERE status = \'unread\''
        );
        res.json({
            success: true,
            count: parseInt(result.rows[0].count)
        });
    } catch (error) {
        console.error('Error counting unread messages:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors du comptage des messages non lus'
        });
    }
});

// Update contact status
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await db.query(
            'UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Message non trouvé'
            });
        }

        res.json({
            success: true,
            message: 'Statut mis à jour avec succès',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour du statut'
        });
    }
});

// Public routes
// Create a new contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez remplir tous les champs'
            });
        }

        // Insert into database
        const result = await db.query(
            'INSERT INTO contacts (name, email, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [name, email, message]
        );

        // Send email notification
        try {
            await sendContactEmail(name, email, message);
        } catch (emailError) {
            console.error('Error sending contact notification email:', emailError);
            // Continue execution even if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Message envoyé avec succès',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'envoi du message'
        });
    }
});

export default router;
