import { Request, UserPlatforms } from '@shared'
import pinoLogger from 'pino'
import axios from 'axios'
import { usersUrl } from '@shared/services.constants'
import { validateUserStatus } from '@shared/middleware/validate-user-status.middleware'

interface UserControllerInterface {
  login: (req: Request) => Promise<any>
}

class UserController implements UserControllerInterface {
  private logger

  constructor() {
    this.logger = pinoLogger()
  }

  public async login(req: Request): Promise<any> {
    await validateUserStatus(req)
    const response = await axios.post(usersUrl, {
      ...req.body,
      platform: UserPlatforms.ORGANIZER_BACKOFFICE,
    })
    return response.data
  }
}

const userController: UserControllerInterface = new UserController()

export { UserController, userController }
