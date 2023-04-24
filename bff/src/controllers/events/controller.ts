import { Request, Response } from '@shared'
import pinoLogger from 'pino'
import axios from 'axios'

interface EventControllerInterface {
  createEvent: (req: Request) => Promise<any>
  getOwnEvents: (req: Request) => Promise<any>
  getEventById: (req: Request) => Promise<any>
  publishEvent: (req: Request) => Promise<any>
}

const BASE_URL = "https://ticket-app-ms-events.onrender.com" // PROD
// const BASE_URL = 'http://event_ms:8080'  // LOCAL


class EventController implements EventControllerInterface {
  private logger

  constructor() {
    this.logger = pinoLogger()
  }

  public async createEvent(req: Request): Promise<any> {
    const response = await axios.post(`${BASE_URL}/events`, req.body)
    return response.data
  }

  public async getOwnEvents(req: Request): Promise<any> {
    const response = await axios.get(`${BASE_URL}/events`, {
      params: { userId: req.query.userId },
    })
    return response.data
  }

  public async getEventById(req: Request): Promise<any> {
    const response = await axios.get(
      `${BASE_URL}/events/${req.params.eventId}`
    )
    return response.data
  }

  public async publishEvent(req: Request): Promise<any> {
    const response = await axios.patch(
      `${BASE_URL}/events/${req.params.eventId}`,
      {
        status: 'PUBLISHED',
      }
    )
    return response.data
  }
}

const eventController: EventControllerInterface = new EventController()

export { EventController, eventController }
