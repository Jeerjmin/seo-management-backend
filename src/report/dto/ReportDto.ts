import { IsNotEmpty } from 'class-validator'

export class ReportDto {
  @IsNotEmpty() readonly options: Array<string>
}
