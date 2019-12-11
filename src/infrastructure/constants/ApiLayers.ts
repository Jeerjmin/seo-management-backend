export class ApiLayers {
  private constructor() {}

  private static readonly ROOT: string = 'api/'
  static readonly SESSIONS: string = `${ApiLayers.ROOT}sessions/`
  static readonly USERS: string = `${ApiLayers.ROOT}users/`
  static readonly ANALYZERS: string = `${ApiLayers.ROOT}analyzers/`
  static readonly STATS: string = `${ApiLayers.ROOT}stats/`
  static readonly REPORT: string = `${ApiLayers.ROOT}reports/`
  static readonly ISSUES: string = `${ApiLayers.ROOT}issues/`
}
