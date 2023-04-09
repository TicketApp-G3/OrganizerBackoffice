/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

export function validateDto(
  type: any,
  on: 'body' | 'params' | 'query' = 'body',
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    let dtoObject: any
    if (on === 'params') {
      dtoObject = plainToInstance(type, Object.assign({}, req.params))
    } else if (on === 'query') {
      dtoObject = plainToInstance(type, req.query)
    } else {
      dtoObject = plainToInstance(type, req.body)
    }
    validate(dtoObject, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors: Record<string, unknown> = {}
          errors.map(
            (error) =>
              (dtoErrors[error.property] = (Object as any).values(
                error.constraints
              ))
          )

          res.setHeader('Content-Type', 'application/json')
          res.status(400).send(JSON.stringify(dtoErrors))
        } else {
          req.body = dtoObject
          next()
        }
      }
    )
  }
}
