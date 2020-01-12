import { NonceHelper } from './NonceHelper'

describe('NonceHelper', () => {
  describe('generateNonce', () => {
    it('should generate nonce with about 64 chars', () => {
      const nonce: string = NonceHelper.generateNonce()
      expect(nonce.length).not.toBeGreaterThan(64)
    })

    it('should generate nonce with 10 chars', () => {
      const nonce: string = NonceHelper.generateNonce(10)
      expect(nonce.length).toBe(10)
    })

    it('should return empty string when provided null argument', () => {
      const nullNonce: string = NonceHelper.generateNonce(null)
      expect(nullNonce).toBe('')
    })
  })
})
