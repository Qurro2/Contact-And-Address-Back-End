import express from 'express';
import { publicRouter } from '../routes/public-api.js';
import { errorMiddleWare } from '../middleware/error-middleware.js';
import { userRouter } from '../routes/api.js';

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleWare);
