import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

async function getTicketTypes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (e) {
    next(e);
  }
}

export default {
  getTicketTypes,
};
