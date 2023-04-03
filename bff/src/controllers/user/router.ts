import { Router } from 'express';
import { registerHandler, validateDto, validateJWT } from '@shared';
// import * from './dtos';
import { userController } from './controller';
import { StatusCodes } from 'http-status-codes';

export function UserRouter() {
  const router = Router();
  return router;
}
