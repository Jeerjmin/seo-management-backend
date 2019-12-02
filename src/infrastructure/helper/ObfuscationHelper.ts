// tslint:disable-next-line: no-var-requires
const CryptoJS = require('crypto-js')

export class ObfuscationHelper {
  private static readonly SECRET_KEY: string = 'Wubbalubbadubdub. Rubber baby buggy bumpers!'

  static encrypt(value: any): string {
    return ObfuscationHelper.isValid(value)
      ? CryptoJS.AES.encrypt(value, ObfuscationHelper.SECRET_KEY).toString()
      : undefined
  }

  static decrypt(value: any): string {
    return ObfuscationHelper.isValid(value)
      ? CryptoJS.AES.decrypt(value, ObfuscationHelper.SECRET_KEY).toString(CryptoJS.enc.Utf8)
      : undefined
  }

  private static isValid(value: any): boolean {
    return value !== undefined && value !== null
  }
}
