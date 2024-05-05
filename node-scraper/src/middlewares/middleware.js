import fs from 'fs'
import jwt from 'jsonwebtoken'

const publicKey = fs.readFileSync('./public.pem', 'utf8');

export const middlewareInfo = (req, res, next) => {
    console.log('🚀 Method: ', req.method);
    console.log('🤖 Path: ', req.path);
    console.log('🐵 Body: ', req.body);
    console.log('🧐 Query: ', req.query);
    console.log('🦾 Params: ', req.params);
    console.log('-----');
    
    next();
}

export const middlewareToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const parts = auth.split(" ");
    const token = parts[1];

    if (token) {
        console.log('🔑 Token: ', token);

        try {
            const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            console.log('JWT verificado:', decoded);
        } catch (error) {
            console.error('La verificación del JWT falló:', error.message);
            res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
    else {
        console.log('🔑 Token: ', 'No');
        res.status(401).json({ message: 'Unauthorized' });
    }
}
