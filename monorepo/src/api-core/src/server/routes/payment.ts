
import express from 'express';
import deleteCardController from '../controllers/payment/delete-card';
import { DeleteCardRequestModel } from '../controllers/payment/delete-card/delete-card-request-model';
import getAllCardsController from '../controllers/payment/get-all-cards';
import saveCardIntentController from '../controllers/payment/save-card-intent';
import setDefaultPaymentMethodController from '../controllers/payment/set-default-payment-method';
import { SetDefaultPaymentMethodRequestModel } from '../controllers/payment/set-default-payment-method/request-model';
import { authenticate } from '../middlewares/authenticate-middleware';
import { validateRequest } from '../middlewares/validate-request-middleware';
const app = express.Router();

app.post('/card', authenticate(), saveCardIntentController);
app.get('/card', authenticate(), getAllCardsController);
app.delete('/card/:cardId', validateRequest(DeleteCardRequestModel, 'params'), authenticate(), deleteCardController);

app.post('/default-card/:cardId', authenticate(), validateRequest(SetDefaultPaymentMethodRequestModel, 'params'), setDefaultPaymentMethodController);
export default app;
