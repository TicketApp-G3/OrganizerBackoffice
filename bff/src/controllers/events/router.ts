import { registerHandler, validateDto, Request } from '@shared'
import { Router } from 'express'
import { eventController } from './controller'
import { EventCreationDTO } from './dtos'
import { StatusCodes } from 'http-status-codes'

export function EventRouter() {
  const router = Router()
  console.log('EventRouter')
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
    registerHandler(
      (req: Request<void, { eventId: string }>) =>
        eventController.getEventById(req),
      StatusCodes.OK
    )
  )

  return router
}
