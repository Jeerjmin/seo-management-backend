import { IsNotEmpty } from 'class-validator'

export class ReportCreateDto {
  @IsNotEmpty() readonly options: Array<string>
}
