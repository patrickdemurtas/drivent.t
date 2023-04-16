import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

export default {
  getTicketTypes,
};
