import { IsNotEmpty } from 'class-validator'

export class ContactDto {
  @IsNotEmpty() from: string
  @IsNotEmpty() store: string
  @IsNotEmpty() message: string
}
