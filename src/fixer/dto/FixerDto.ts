import { IsNotEmpty } from 'class-validator'

export class FixerDto {
  @IsNotEmpty() type: string
}
