export class StatsDto {
  constructor(
    private readonly accessibility: number,
    private readonly performance: number,
    private readonly seo: number,
  ) {}
}
