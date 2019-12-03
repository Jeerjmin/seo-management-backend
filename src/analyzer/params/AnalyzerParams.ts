import { IsString, IsNotEmpty } from 'class-validator'

export class AnalyzerParams {
  @IsNotEmpty() @IsString() type: string
  @IsString() fields: string
}
