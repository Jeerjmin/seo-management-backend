export class ApiLayers {
  private constructor() {}

  private static readonly ROOT: string = 'api/'
  static readonly SESSIONS: string = `${ApiLayers.ROOT}sessions/`
  static readonly USERS: string = `${ApiLayers.ROOT}users/`
  static readonly ANALYZERS: string = `${ApiLayers.ROOT}analyzers/`
}
