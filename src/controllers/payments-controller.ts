import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { PaymentType, TicketId } from '@/protocols';
import paymentsService from '@/services/payments-service';

export async function paymentInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { ticketId } = req.query as TicketId;
  try {
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.paymentInfo(userId, parseInt(ticketId));

    return res.status(httpStatus.OK).send(payment);
  } catch (e) {
    next(e);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const infoPay = req.body as PaymentType;

  try {
    if (!infoPay.cardData || !infoPay.ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const ticketInfo = await paymentsService.paymentProcess(infoPay, userId);

    return res.status(httpStatus.OK).send(ticketInfo);
  } catch (e) {
    next(e);
  }
}
