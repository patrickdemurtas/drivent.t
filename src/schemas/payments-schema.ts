import Joi from 'joi';

const ticketSchema = Joi.object({
  ticketId: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
});

export { ticketSchema };
