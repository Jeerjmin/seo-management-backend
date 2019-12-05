export class NonceHelper {
  private constructor() {}

  static generateNonce(bits = 64) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < bits; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * bits))
    }
    return text
  }
}
