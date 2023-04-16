import { prisma } from '@/config';

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId: ticketId } });
}

async function checkPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
    select: {
      Ticket: {
        select: {
          Enrollment: true,
        },
      },
    },
  });
}

async function idTicketFinder(id: number) {
  return prisma.ticket.findFirst({ where: { id: id } });
}

export default {
  findPayment,
  checkPayment,
  idTicketFinder,
};
