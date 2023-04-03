import { Express } from 'express';
import { UserRouter } from './user';

export function registerRouters(app: Express) {
  app.get('/health', (_, res) => res.status(200).send());
  app.use('/user', UserRouter());
}
