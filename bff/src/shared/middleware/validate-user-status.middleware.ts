import { UnauthorizedException } from '@shared/exceptions'
import { usersUrl } from '@shared/services.constants'
import axios from 'axios'
import { Request } from 'express'

export async function validateUserStatus(req: Request) {
  const userId = req.headers.authorization?.substring('Bearer '.length)
  if (!userId) {
    throw new UnauthorizedException('Missing auth token')
  }
  const response = await axios.get(`${usersUrl}//organizers/${userId}/status`)
  if (response.status === 200 && response.data.isBlocked) {
    throw new UnauthorizedException('user blocked')
  }
}
