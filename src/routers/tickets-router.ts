import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken);
ticketsRouter.get('/types', ticketsController.getTicketTypes);

export { ticketsRouter };
