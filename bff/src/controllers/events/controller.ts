import { Request } from '@shared'
import pinoLogger from 'pino'
import axios from 'axios'
import { eventsUrl } from '@shared/services.constants'
import { validateUserStatus } from '@shared/middleware/validate-user-status.middleware'

class EventController {
  private logger

  constructor() {
    this.logger = pinoLogger()
  }

  public async createEvent(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.post(eventsUrl, req.body)
    return response.data
  }

  public async updateEvent(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.patch(
      `${eventsUrl}/${req.params.eventId}`,
      req.body
    )
    return response.data
  }

  public async getOwnEvents(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.get(eventsUrl, {
      params: { userId: req.query.userId },
    })
    return response.data
  }

  public async getEventById(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.get(`${eventsUrl}/${req.params.eventId}`)
    return response.data
  }

  public async publishEvent(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.patch(`${eventsUrl}/${req.params.eventId}`, {
      status: 'PUBLISHED',
    })
    return response.data
  }

  public async cancelEvent(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.patch(`${eventsUrl}/${req.params.eventId}`, {
      status: 'CANCELLED',
    })
    return response.data
  }

  public async deleteEvent(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.patch(`${eventsUrl}/${req.params.eventId}`, {
      status: 'DELETED',
    })
    return response.data
  }
}

const eventController: EventController = new EventController()

export { EventController, eventController }
