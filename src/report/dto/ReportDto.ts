import { Type } from 'class-transformer'
import { ReportDetailsDto } from './ReportDetailsDto'

export class ReportDto {
  id: number
  ownerId: number
  createdAt: Date
  @Type(() => ReportDetailsDto)
  details: ReportDetailsDto
}
