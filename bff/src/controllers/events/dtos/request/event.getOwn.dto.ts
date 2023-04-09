import { IsString } from 'class-validator'

export class GetOwnEvents {
  @IsString()
  ownerId: string
}
