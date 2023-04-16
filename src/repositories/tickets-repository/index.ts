import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function generateTicket(enrolId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrolId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

export default {
  getTicketTypes,
  getTicket,
  generateTicket,
};
