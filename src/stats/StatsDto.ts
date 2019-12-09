import { Expose } from 'class-transformer'

declare interface StatsType {
  value: any
  lastValue: any
  createdAt: string
}

export class StatsDto {
  @Expose({ name: 'Accessibility' }) private readonly accessibility: StatsType
  @Expose({ name: 'Performance' }) private readonly performance: StatsType
  @Expose({ name: 'SEO' }) private readonly seo: StatsType

  constructor(accessibility: StatsType, performance: StatsType, seo: StatsType) {
    this.accessibility = accessibility
    this.performance = performance
    this.seo = seo
  }
}
