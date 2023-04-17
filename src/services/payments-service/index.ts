import { Payment, TicketStatus } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentType } from '@/protocols';
import paymentsRepository from '@/repositories/payments-repository';

async function paymentInfo(userId: number, ticketId: number): Promise<Payment> {
  const ticketInfo = await paymentsRepository.idTicketFinder(ticketId);

  if (!ticketInfo) throw notFoundError();

  if (userId !== ticketInfo.Enrollment.userId) throw unauthorizedError();

  return await paymentsRepository.paymentInfo(ticketId);
}

async function paymentProcess(data: PaymentType, userId: number): Promise<Payment> {
  const status: TicketStatus = 'PAID';

  const paymentInfo = await paymentsRepository.idTicketFinder(data.ticketId);

  if (!paymentInfo) throw notFoundError();

  if (userId !== paymentInfo.Enrollment.userId) throw unauthorizedError();

  await paymentsRepository.updateTicket(status, paymentInfo.id);

  return await paymentsRepository.paymentProcess(data, paymentInfo.TicketType.price);
}

const paymentsService = {
  paymentInfo,
  paymentProcess,
};

export default paymentsService;
