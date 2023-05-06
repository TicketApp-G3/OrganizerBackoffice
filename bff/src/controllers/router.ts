import { Express } from 'express'
import { EventRouter } from './events'
import { UserRouter } from './users'

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.status(200).send())
  app.use('/events', EventRouter())
  app.use('/users', UserRouter())
}
