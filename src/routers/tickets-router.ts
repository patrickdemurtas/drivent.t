import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken);
ticketsRouter.get('/types', ticketsController.getTicketTypes);
ticketsRouter.get('/', ticketsController.getTicket);
ticketsRouter.post('/', validateBody(ticketSchema), ticketsController.generateTicket);

export { ticketsRouter };
