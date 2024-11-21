import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import authRoutes from"./routes/auth.js"

const app = express();
const port = process.env.PORT || 3500;

// Configuration de la connexion à la base de données PostgreSQL
export const db = new Client({
    host: 'localhost',
    user: 'ericsson',
    password: 'ericsson',
    database: 'btr',
    port: 5432,
});

// Établir la connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données PostgreSQL.');
});

// Middleware pour parser le JSON
app.use(express.json());

// Créer un utilisateur
app.post('/users', authRoutes );

// Lire tous les utilisateurs
app.get('/users', );

// Lire un utilisateur par ID
app.get('/users/:id', (req, res) => {
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

// Mettre à jour un utilisateur
app.put('/users/:id', async (req, res) => {
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

// Supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
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

// Créer une publication
app.post('/publications', async (req, res) => {
    const { title, description, date, image, author, category } = req.body;
    const query = 'INSERT INTO publications (title, description, date, image, author, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    
    db.query(query, [title, description, date, image, author, category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, title, description, date, image, author, category });
    });
});

// Lire toutes les publications
app.get('/publications', (req, res) => {
    const query = 'SELECT * FROM publications';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

// Lire une publication par ID
app.get('/publications/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM publications WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        res.status(200).json(results.rows[0]);
    });
});

// Mettre à jour une publication
app.put('/publications/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, date, image, author, category } = req.body;
    const query = 'UPDATE publications SET title = $1, description = $2, date = $3, image = $4, author = $5, category = $6 WHERE id = $7';
    
    db.query(query, [title, description, date, image, author, category, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        res.status(200).json({ message: 'Publication mise à jour' });
    });
});

// Supprimer une publication
app.delete('/publications/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM publications WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Publication non trouvée' });
        }
        res.status(200).json({ message: 'Publication supprimée' });
    });
});

// CRUD pour les projets
app.post('/projects', async (req, res) => {
    const { num, category, title, description, img, live, github } = req.body;
    const query = 'INSERT INTO projects (num, category, title, description, img, live, github) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    
    db.query(query, [num, category, title, description, img, live, github], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, num, category, title, description, img, live, github });
    });
});

// Lire tous les projets
app.get('/projects', (req, res) => {
    const query = 'SELECT * FROM projects';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

// Lire un projet par ID
app.get('/projects/:id', (req, res) => {
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

// Mettre à jour un projet
app.put('/projects/:id', (req, res) => {
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

// Supprimer un projet
app.delete('/projects/:id', (req, res) => {
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

// CRUD pour les stacks de projet
app.post('/project_stacks', async (req, res) => {
    const { project_id, name } = req.body;
    const query = 'INSERT INTO project_stacks (project_id, name) VALUES ($1, $2) RETURNING id';
    
    db.query(query, [project_id, name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, project_id, name });
    });
});

// Lire tous les stacks de projet
app.get('/project_stacks', (req, res) => {
    const query = 'SELECT * FROM project_stacks';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

// Lire un stack de projet par ID
app.get('/project_stacks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM project_stacks WHERE id = $1';
    
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

// Mettre à jour un stack de projet
app.put('/project_stacks/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, name } = req.body;
    const query = 'UPDATE project_stacks SET project_id = $1, name = $2 WHERE id = $3';
    
    db.query(query, [project_id, name, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Stack de projet non trouvé' });
        }
        res.status(200).json({ message: 'Stack de projet mis à jour' });
    });
});

// Supprimer un stack de projet
app.delete('/project_stacks/:id', (req, res) => {
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

// CRUD pour les membres de l'équipe
app.post('/team_members', async (req, res) => {
    const { name, title, image_url, facebook, github, instagram } = req.body;
    const query = 'INSERT INTO team_members (name, title, image_url, facebook, github, instagram) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    
    db.query(query, [name, title, image_url, facebook, github, instagram], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, name, title, image_url, facebook, github, instagram });
    });
});

// Lire tous les membres de l'équipe
app.get('/team_members', (req, res) => {
    const query = 'SELECT * FROM team_members';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

// Lire un membre de l'équipe par ID
app.get('/team_members/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM team_members WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Membre de l\'équipe non trouvé' });
        }
        res.status(200).json(results.rows[0]);
    });
});

// Mettre à jour un membre de l'équipe
app.put('/team_members/:id', (req, res) => {
    const { id } = req.params;
    const { name, title, image_url, facebook, github, instagram } = req.body;
    const query = 'UPDATE team_members SET name = $1, title = $2, image_url = $3, facebook = $4, github = $5, instagram = $6 WHERE id = $7';
    
    db.query(query, [name, title, image_url, facebook, github, instagram, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Membre de l\'équipe non trouvé' });
        }
        res.status(200).json({ message: 'Membre de l\'équipe mis à jour' });
    });
});

// Supprimer un membre de l'équipe
app.delete('/team_members/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM team_members WHERE id = $1';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Membre de l\'équipe non trouvé' });
        }
        res.status(200).json({ message: 'Membre de l\'équipe supprimé' });
    });
});

// CRUD pour les responsabilités
app.post('/responsibilities', async (req, res) => {
    const { team_member_id, responsibility } = req.body;
    const query = 'INSERT INTO responsibilities (team_member_id, responsibility) VALUES ($1, $2) RETURNING id';
    
    db.query(query, [team_member_id, responsibility], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, team_member_id, responsibility });
    });
});

// Lire toutes les responsabilités
app.get('/responsibilities', (req, res) => {
    const query = 'SELECT * FROM responsibilities';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
});

// Lire une responsabilité par ID
app.get('/responsibilities/:id', (req, res) => {
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

// Mettre à jour une responsabilité
app.put('/responsibilities/:id', (req, res) => {
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

// Supprimer une responsabilité
app.delete('/responsibilities/:id', (req, res) => {
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

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
