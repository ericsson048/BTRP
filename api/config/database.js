import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

export const db = new Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
});

// Établir la connexion à la base de données
(async () => {
    try {
        await db.connect();
        console.log('Connecté à la base de données PostgreSQL.');
    } catch (err) {
        console.error('Erreur de connexion à la base de données: ' + err.stack);
    }
})();
