import httpStatus from 'http-status';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

async function infoTicketPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query as { ticketId: string };

  try {
    const parameter = parseInt(ticketId);
    const info = await paymentsService.infoTicketPayment(parameter);
    return res.status(httpStatus.OK).send(info);
  } catch (e) {
    next(e);
  }
}

export { infoTicketPayment };
