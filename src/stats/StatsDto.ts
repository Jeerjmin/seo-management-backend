import { Expose } from 'class-transformer'

declare interface StatsType {
  value: any
  lastValue: any
  createdAt: string
}

export class StatsDto {
  @Expose({ name: 'Accessibility' }) private readonly accessibility: StatsType
  @Expose({ name: 'Performance' }) private readonly performance: StatsType
  @Expose({ name: 'Best Practices' }) private readonly bestPractices: StatsType

  constructor(accessibility: StatsType, performance: StatsType, bestPractices: StatsType) {
    this.accessibility = accessibility
    this.performance = performance
    this.bestPractices = bestPractices
  }
}
