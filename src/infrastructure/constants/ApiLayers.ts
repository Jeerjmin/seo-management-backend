export class ApiLayers {
  private constructor() {}

  private static readonly ROOT: string = 'api/'
  static readonly SESSIONS: string = `${ApiLayers.ROOT}sessions/`
  static readonly USERS: string = `${ApiLayers.ROOT}users/`
  static readonly ANALYZERS: string = `${ApiLayers.ROOT}analyzers/`
  static readonly STATS: string = `${ApiLayers.ROOT}stats/`
  static readonly REPORT: string = `${ApiLayers.ROOT}reports/`
  static readonly ISSUES: string = `${ApiLayers.ROOT}issues/`
  static readonly BROKEN_LINKS: string = `${ApiLayers.ROOT}broken-links/`
  static readonly FIXERS: string = `${ApiLayers.ROOT}fixers/`
  static readonly CONTACT: string = `${ApiLayers.ROOT}contact/`
}
