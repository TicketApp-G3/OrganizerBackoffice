import { registerHandler, validateSchema, Request, FieldOptions } from '@shared'
import { Router } from 'express'
import { eventController } from './controller'
import {
  EventCreationDTO,
  EventCreationDTOSchema,
  GetOwnEvents,
  GetOwnEventsSchema,
} from './dtos'
import { StatusCodes } from 'http-status-codes'

export function EventRouter() {
  const router = Router()
  router.post(
    '/',
    validateSchema(EventCreationDTOSchema, [FieldOptions.body]),
    registerHandler(
      (req) => eventController.createEvent(req),
      StatusCodes.CREATED
    )
  )

  router.get(
    '/own',
    validateSchema(GetOwnEventsSchema, [FieldOptions.query]),
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
