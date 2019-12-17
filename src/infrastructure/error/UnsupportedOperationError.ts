export class UnsupportedOperationError extends Error {
  constructor() {
    super('Not supported yet.')
    Object.setPrototypeOf(this, UnsupportedOperationError.prototype)
  }
}
