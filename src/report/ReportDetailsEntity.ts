import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('report-details')
export class ReportDetailsEntity {
  @PrimaryGeneratedColumn() @Exclude() id: number
  @Column({ nullable: true, type: 'decimal' }) accessibilityScore: number
  @Column({ nullable: true, type: 'decimal' }) performanceScore: number
  @Column({ nullable: true, type: 'decimal' }) bestPracticesScore: number
  @Column({ default: 0 }) altTagsCount: number
  @Column({ default: 0 }) filledAltTagsCount: number
  @Column({ default: 'N/A' }) firstContentfulPaint: string
  @Column({ default: 'N/A' }) speedIndex: string
  @Column({ default: 'N/A' }) timeToInteractive: string
  @Column({ default: 'N/A' }) firstMeaningfulPaint: string
  @Column({ default: 'N/A' }) firstCpuIdle: string
  @Column({ default: 'N/A' }) estimatedInputLatency: string
  @Column({ default: 'N/A' }) consoleErrors: string
  @Column({ default: 'N/A' }) vulnerableLibraries: string
  @Column({ default: false }) avoidsDeprecatedApis: boolean
  @Column({ default: false }) allowsPastePassword: boolean
  @Column({ default: false }) correctAspectRatio: boolean
  @Column({ default: false }) avoidsCrossLinks: boolean
  @Column({ default: false }) usesHttps: boolean
}
