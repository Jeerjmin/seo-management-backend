import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('report-details')
export class ReportDetailsEntity {
  @PrimaryGeneratedColumn() @Exclude() id: number
  @Column({ nullable: true, type: 'decimal' }) accessibilityScore: number
  @Column({ nullable: true, type: 'decimal' }) performanceScore: number
  @Column({ nullable: true, type: 'decimal' }) bestPracticesScore: number
  @Column({ nullable: true }) altTagsCount: number
  @Column({ nullable: true }) filledAltTagsCount: number
  @Column({ nullable: true }) firstContentfulPaint: string
  @Column({ nullable: true }) speedIndex: string
  @Column({ nullable: true }) timeToInteractive: string
  @Column({ nullable: true }) firstMeaningfulPaint: string
  @Column({ nullable: true }) firstCpuIdle: string
  @Column({ nullable: true }) estimatedInputLatency: string
  @Column({ nullable: true }) consoleErrors: string
  @Column({ nullable: true }) vulnerableLibraries: string
  @Column({ nullable: true }) avoidsDeprecatedApis: boolean
  @Column({ nullable: true }) allowsPastePassword: boolean
  @Column({ nullable: true }) correctAspectRatio: boolean
  @Column({ nullable: true }) avoidsCrossLinks: boolean
  @Column({ nullable: true }) usesHttps: boolean
}
