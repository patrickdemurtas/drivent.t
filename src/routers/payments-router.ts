import { Router } from 'express';
import { authenticateToken, validateQueries } from '@/middlewares';
import { ticketSchema } from '@/schemas';
import { infoTicketPayment } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('*', authenticateToken);
paymentsRouter.get('/', validateQueries(ticketSchema), infoTicketPayment);

export { paymentsRouter };
