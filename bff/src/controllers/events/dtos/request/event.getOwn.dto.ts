import { IsString } from 'class-validator'
import Joi from 'joi'

export class GetOwnEvents {
  @IsString()
  ownerId: string
}

export const GetOwnEventsSchema = Joi.object({
  ownerId: Joi.string().required(),
})
