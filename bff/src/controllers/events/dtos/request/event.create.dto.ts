import Joi from 'joi'

export class EventCreationDTO {
  ownerId: string
  title: string
  description: string
  latitude: number
  longitude: number
  address: string
  place: string
  type: string
  timeFrom: Date
  timeTo: Date
  images: string[]
  capacity: number
  faqs: Object[]
  schedule: Object[]
}

export const EventCreationDTOSchema = Joi.object({
  ownerId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  address: Joi.string().required(),
  place: Joi.string().optional(),
  type: Joi.string().required(),
  timeFrom: Joi.date().required(),
  timeTo: Joi.date().required(),
  images: Joi.array().required(),
  capacity: Joi.number().positive().required(),
  faqs: Joi.array().optional(),
  schedule: Joi.array().optional(),
})
