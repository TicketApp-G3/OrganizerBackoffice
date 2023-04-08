import { Request } from '@shared'
import pinoLogger from 'pino'
import axios from 'axios'

interface EventControllerInterface {
  createEvent: (req: Request) => Promise<any>
  getOwnEvents: (req: Request) => Promise<any>
  getEventById: (req: Request) => Promise<any>
}

class EventController implements EventControllerInterface {
  private logger

  constructor() {
    this.logger = pinoLogger()
  }

  public async createEvent(req: Request): Promise<any> {
    const response = await axios.post('http://localhost:8080/events', req.body)
    return response
  }

  public async getOwnEvents(req: Request): Promise<any> {
    const response = await axios.get(`http://localhost:8080/events/`, {
      params: { userId: req.query.userId },
    })
    return response
  }

  public async getEventById(req: Request): Promise<any> {
    const response = await axios.get(`http://localhost:8080/events/}`, {
      params: { eventId: req.params.eventId },
    })
    return response
  }
}

const eventController: EventControllerInterface = new EventController()

export { EventController, eventController }
