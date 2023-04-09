import { Express } from 'express';
import { EventRouter } from './events';

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.status(200).send());
  app.use('/events', EventRouter());
}
