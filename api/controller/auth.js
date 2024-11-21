import bcrypt from 'bcrypt';
import { createError } from '../utils/error';
import { db } from '..';

export const login = async (req, res, next) => {
    const body = req.body;
    const query1 = 'SELECT * FROM users where name= $1';
    let user = null
    try {
        db.query(query1,[body.name],(err,results)=>{
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.rows.length === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            user = results.rows[0]
        })
        const IspasswordCorrect = await bcrypt.compare(body.password, user.password)
        if(!IspasswordCorrect) return next(createError(400, "mauvaise mot de passe"))

        const token = jwt.sign({id:User.id},process.env.SECRET_JWT)

        const{password,...otherDetails} = User._doc;
        res.cookie("access_token",token,{httpOnly:true}).json({details:{...otherDetails}})        
    } catch (error) {
       next(error); 
    }
    
    

}

export const register = async (req, res) => {
    const { name, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4) RETURNING id';
    
    db.query(query, [name, email, hashedPassword, image], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.rows[0].id, name, email, image });
    });
}