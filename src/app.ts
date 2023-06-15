import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { dataRouter } from './routers/subject.router.js';
import { errorHandler } from './middleware/error.js';
import { filmRouter } from './routers/film.router.js';
import { userRouter } from './routers/user.router.js';

const debug = createDebug('W6:App');

export const app = express();

debug('Start Express app');
const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_req, _res, next) => {
  debug('');
  next();
});

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Hello Express!');
});

app.use('/data', dataRouter);
app.use('/films', filmRouter);
app.use('/user', userRouter);

app.use(errorHandler);
