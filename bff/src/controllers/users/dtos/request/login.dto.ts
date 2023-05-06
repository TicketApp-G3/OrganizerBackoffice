import Joi from 'joi'

export class LoginDto {
  public userId: string
  public name: string
  public lastName: string
  public email: string
}

export const LoginDtoSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
})
