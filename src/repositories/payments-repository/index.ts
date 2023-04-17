import { TicketType, TicketStatus, Enrollment, Payment, Ticket } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentType } from '@/protocols';

async function idTicketFinder(ticketId: number): Promise<Ticket & { Enrollment: Enrollment; TicketType: TicketType }> {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

async function paymentInfo(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function paymentProcess(data: PaymentType, price: number): Promise<Payment> {
  const numbersCard = data.cardData.number;
  const lastNumbers = numbersCard.slice(numbersCard.length - 4);

  return await prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: price,
      cardIssuer: data.cardData.issuer,
      cardLastDigits: lastNumbers,
    },
  });
}

async function updateTicket(status: TicketStatus, ticketId: number): Promise<Ticket> {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: status,
    },
  });
}

const paymentsRepository = {
  idTicketFinder,
  paymentInfo,
  paymentProcess,
  updateTicket,
};

export default paymentsRepository;
