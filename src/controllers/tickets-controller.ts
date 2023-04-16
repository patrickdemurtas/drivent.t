import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (e) {
    next(e);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (e) {
    next(e);
  }
}

export async function generateTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  const { userId } = req as { userId: number };

  try {
    const genTicket = await ticketsService.generateTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(genTicket);
  } catch (e) {
    if (e.name === 'notFoundError') return res.status(httpStatus.NOT_FOUND).send(e.message);
    next(e);
  }
}
