import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

import './database';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);

dotenv.config();

app.listen(3333, () => {
  console.log('🏃 Server Online');
});
