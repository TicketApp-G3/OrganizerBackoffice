import { registerHandler, validateDto } from '@shared'
import { Router } from 'express'
import { Request } from '@shared'
import { eventController } from './controller'
import { EventCreationDTO, GetEventDto } from './dtos'
import { StatusCodes } from 'http-status-codes'

export function EventRouter() {
  const router = Router()

  router.post(
    '/',
    validateDto(EventCreationDTO),
    registerHandler(
      (req) => eventController.createEvent(req),
      StatusCodes.CREATED
    )
  )

  router.get(
    '/own',
    registerHandler((req) => eventController.getOwnEvents(req), StatusCodes.OK)
  )

  router.get(
    '/:eventId',
    registerHandler((req) => eventController.getEventById(req), StatusCodes.OK)
  )

  return router
}
