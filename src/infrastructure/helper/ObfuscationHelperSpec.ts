import { ObfuscationHelper } from './ObfuscationHelper'

describe('ObfuscationHelper', () => {
  it('encrypts and decrypts', () => {
    const encryptedValue = ObfuscationHelper.encrypt('I was encrypted')
    const decryptedValue = ObfuscationHelper.decrypt(encryptedValue)

    expect(decryptedValue).toBe('I was encrypted')
  })

  it('should return empty string when non-encrypted value provided', () => {
    const decryptedValue = ObfuscationHelper.decrypt('I was not encrypted')
    expect(decryptedValue).toBe('')
  })

  describe('encrypt', () => {
    it('should return undefined if null or undefined provided', () => {
      const nullEncrypt: string = ObfuscationHelper.encrypt(null)
      const undefinedEncrypt: string = ObfuscationHelper.encrypt(undefined)

      expect(nullEncrypt).toBe(undefined)
      expect(undefinedEncrypt).toBe(undefined)
    })
  })

  describe('decrypt', () => {
    it('should return undefined if null or undefined provided', () => {
      const nullDecrypt: string = ObfuscationHelper.decrypt(null)
      const undefinedDecrypt: string = ObfuscationHelper.decrypt(undefined)

      expect(nullDecrypt).toBe(undefined)
      expect(undefinedDecrypt).toBe(undefined)
    })
  })
})
