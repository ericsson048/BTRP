import { db } from "..";

export const getUsers = async (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
}