import { Router } from 'express';
import { getTicketTypes, getTicket, generateTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken);
ticketsRouter.get('/types', getTicketTypes);
ticketsRouter.get('/', getTicket);
ticketsRouter.post('/', validateBody(ticketSchema), generateTicket);

export { ticketsRouter };
