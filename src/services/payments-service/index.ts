import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';

async function infoTicketPayment(ticketId: number) {
  const info = await paymentsRepository.idTicketFinder(ticketId);
  if (!info) throw notFoundError();

  const payCheck = await paymentsRepository.checkPayment(ticketId);
  if (!payCheck) throw unauthorizedError();

  const pay = await paymentsRepository.findPayment(ticketId);
  return pay;
}

export type TicketId = Pick<Payment, 'ticketId'>;

export default {
  infoTicketPayment,
};
