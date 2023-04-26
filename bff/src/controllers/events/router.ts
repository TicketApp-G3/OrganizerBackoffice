import { registerHandler, validateSchema, Request, FieldOptions } from '@shared'
import { Router } from 'express'
import { eventController } from './controller'
import { EventCreationDTOSchema, GetOwnEventsSchema } from './dtos'
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

  router.patch(
    '/:eventId',
    registerHandler(
      (req: Request<void, { eventId: string }>) =>
      eventController.updateEvent(req),
    StatusCodes.OK
    )
  )

  router.post(
    '/:eventId/publish',
    registerHandler(
      (req: Request<void, { eventId: string }>) =>
        eventController.publishEvent(req),
      StatusCodes.OK
    )
  )

  router.post(
    '/:eventId/cancel',
    registerHandler(
      (req: Request<void, { eventId: string }>) =>
        eventController.cancelEvent(req),
      StatusCodes.OK
    )
  )

  router.post(
    '/:eventId/delete',
    registerHandler(
      (req: Request<void, { eventId: string }>) =>
        eventController.deleteEvent(req),
      StatusCodes.OK
    )
  )

  return router
}
