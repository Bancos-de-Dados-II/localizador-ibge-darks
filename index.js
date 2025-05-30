import express from 'express';
import cors from 'cors';
import viewBoxRouter from './back-end/router/viewBox-router.js';
import banco from './back-end/database/sequelize.js';

const app = express();
const port = 3000;

app.use(cors());
app.use('/', viewBoxRouter);


try {
  await banco.authenticate();
  console.log('Conexão com o banco estabelecida com sucesso.');
} catch (err) {
  console.error('Erro ao conectar no banco', err);
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
