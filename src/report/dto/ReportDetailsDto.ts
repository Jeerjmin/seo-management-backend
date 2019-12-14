import { Expose, Exclude } from 'class-transformer'

export class ReportDetailsDto {
  @Exclude() id: number
  @Expose({ name: 'Accessibility Score', toPlainOnly: true }) accessibilityScore: number
  @Expose({ name: 'Performance Score', toPlainOnly: true }) performanceScore: number
  @Expose({ name: 'Best Practices Score', toPlainOnly: true }) bestPracticesScore: number
  @Expose({ name: 'Alt Tags Count', toPlainOnly: true }) altTagsCount: number
  @Expose({ name: 'Filled Alt Tags Count', toPlainOnly: true }) filledAltTagsCount: number
  @Expose({ name: 'First Contentful Paint', toPlainOnly: true }) firstContentfulPaint: string
  @Expose({ name: 'Speed Index', toPlainOnly: true }) speedIndex: string
  @Expose({ name: 'Time To Interactive', toPlainOnly: true }) timeToInteractive: string
  @Expose({ name: 'First Meaningful Paint', toPlainOnly: true }) firstMeaningfulPaint: string
  @Expose({ name: 'First CPU Idle', toPlainOnly: true }) firstCpuIdle: string
  @Expose({ name: 'Estimated Input Latency', toPlainOnly: true }) estimatedInputLatency: string
  @Expose({ name: 'Console errors', toPlainOnly: true }) consoleErrors: string
  @Expose({ name: 'No vulnerable libraries', toPlainOnly: true }) vulnerableLibraries: string
  @Expose({ name: 'Avoids deprecated APIs', toPlainOnly: true }) avoidsDeprecatedApis: boolean
  @Expose({ name: 'Allows users to paste into password fields', toPlainOnly: true }) allowsPastePassword: boolean
  @Expose({ name: 'Displays images with correct aspect ratio', toPlainOnly: true }) correctAspectRatio: boolean
  @Expose({ name: 'Avoids links to cross-origin destinations', toPlainOnly: true }) avoidsCrossLinks: boolean
  @Expose({ name: 'Uses HTTPS', toPlainOnly: true }) usesHttps: boolean
}
