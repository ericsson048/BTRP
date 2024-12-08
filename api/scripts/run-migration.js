import { db } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    try {
        // Read and execute the contacts table migration
        const migrationPath = path.join(__dirname, '..', 'migrations', 'create_contacts_table.sql');
        const migration = fs.readFileSync(migrationPath, 'utf8');
        
        await db.query(migration);
        console.log('Migration completed successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
