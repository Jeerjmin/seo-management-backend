import { IsString, IsNotEmpty } from 'class-validator'

export class AnalyzerParams {
  @IsNotEmpty() @IsString() type: string
  @IsString() format: string
  @IsString() fields: string
}
