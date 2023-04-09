import { NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import snakecaseKeys from 'snakecase-keys'

import { Request, Response } from './http'

type ResBody = Record<string, unknown> | Record<string, unknown>[] | void

export function registerHandler<T = Record<string, unknown>>(
  handler: (req: Request<T>, res: Response) => Promise<ResBody>,
  statusCode = StatusCodes.OK
): (
  req: Request<T>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void> {
  return async (
    req: Request<T>,
    res: Response<ResBody>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resObject = (await handler(req, res)) as Record<string, unknown>
      if (!resObject) {
        res.status(statusCode).send()
      } else {
        const snakeResObject = snakecaseKeys(resObject, {
          deep: true,
        })
        res.status(statusCode).json(snakeResObject)
      }
    } catch (error) {
      res.status(error.response.status).send(error.response.data)
    }
  }
}
