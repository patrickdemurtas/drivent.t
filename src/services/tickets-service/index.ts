import { TicketType, Ticket } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.getTicketTypes();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getTicket(userId: number) {
  const enrol = await enrollmentRepository.enrolByUserId(userId);

  if (!enrol) throw notFoundError();

  const ticket = await ticketsRepository.getTicket(enrol.id);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function generateTicket(userId: number, ticketTypeId: number) {
  const enrol = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrol) throw notFoundError();

  const genTicket = await ticketsRepository.generateTicket(enrol.id, ticketTypeId);
  if (!genTicket) throw notFoundError();

  return genTicket;
}

export type typeIdInput = Pick<Ticket, 'ticketTypeId'>;

export default {
  getTicketTypes,
  getTicket,
  generateTicket,
};
