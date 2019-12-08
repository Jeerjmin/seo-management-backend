import { IsNotEmpty } from 'class-validator'

export class AnalyzerReportDto {
  @IsNotEmpty() readonly options: Array<string>
}
