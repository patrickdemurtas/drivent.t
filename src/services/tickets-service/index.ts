import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketTypes();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

export default {
  getTicketTypes,
};
