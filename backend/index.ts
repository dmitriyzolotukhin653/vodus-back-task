import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import promotionsRouter from './routes/promotions';

dayjs.extend(utc);

const app = express();

app.use(cors());

app.use(promotionsRouter);

app.listen(8080, () => {
  console.log('Server is started');
});
