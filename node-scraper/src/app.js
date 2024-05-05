import cors from 'cors'
import express from 'express'
import detectPort from 'detect-port'
import routes from './routes/routes.js'


export const app = express();

app.use(cors())
app.use(express.json())
app.use(routes)

// detectPort(0, (err, port) => {
//     if (err) {
//       console.log('Error al detectar un puerto disponible', err);
//       return;
//     }
  
//     app.listen(port, () => {
//       console.log(`Servidor ejecutándose en http://localhost:${port}`);
//     });
// });
app.listen(8021)
console.log("server on port", 8021)