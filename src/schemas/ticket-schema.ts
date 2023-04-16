import Joi from 'joi';
import { typeIdInput } from '@/services/tickets-service';

const ticketSchema = Joi.object<typeIdInput>({ ticketTypeId: Joi.number().required() });

export { ticketSchema };
