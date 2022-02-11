
import express from 'express';
import appendToWaitingListController from '../controllers/waiting-list/append';
import { AppendToWaitingListRequestModel } from '../controllers/waiting-list/append/request-model';
import { validateRequest } from '../middlewares/validate-request-middleware';

const app = express.Router();

app.post('/', validateRequest(AppendToWaitingListRequestModel), appendToWaitingListController);
export default app;
