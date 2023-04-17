import { Router } from 'express';
import { authenticateToken, validateQueries } from '@/middlewares';
import { paymentInfo, paymentProcess } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', paymentInfo);
paymentsRouter.post('/process', paymentProcess);

export { paymentsRouter };
