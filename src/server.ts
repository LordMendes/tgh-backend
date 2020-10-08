import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

import './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

dotenv.config();

app.listen(PORT, () => {
  console.log('🏃 Server Online');
});
