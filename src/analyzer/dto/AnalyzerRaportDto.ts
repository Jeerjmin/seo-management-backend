import { IsNotEmpty } from 'class-validator'

export class AnalyzerRaportDto {
  @IsNotEmpty() readonly options: Array<string>
}
