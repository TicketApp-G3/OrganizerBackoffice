import { FieldOptions, registerHandler, Request, validateSchema } from '@shared'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { LoginDtoSchema } from './dtos'
import { userController } from './controller'

export function UserRouter() {
  const router = Router()

  router.post(
    '/',
    validateSchema(LoginDtoSchema, [FieldOptions.body]),
    registerHandler((req: Request) => userController.login(req), StatusCodes.OK)
  )

  return router
}
