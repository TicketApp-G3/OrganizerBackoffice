import Joi from 'joi'

export class EventCreationDTO {
  title: string
  description: string
  latitude: number
  longitude: number
  address: string
  place: string
  type: string
  dateTime: Date
  images: string[]
  capacity: number
}

export const EventCreationDTOSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  address: Joi.string().required(),
  place: Joi.string().optional(),
  type: Joi.string().required(),
  dateTime: Joi.date().required(),
  images: Joi.array().required(),
  capacity: Joi.number().positive().required(),
})
