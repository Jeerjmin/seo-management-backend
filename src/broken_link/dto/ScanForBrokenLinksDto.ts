import { IsNotEmpty } from 'class-validator'

export class ScanForBrokenLinksDto {
  @IsNotEmpty() scanType: string
}
