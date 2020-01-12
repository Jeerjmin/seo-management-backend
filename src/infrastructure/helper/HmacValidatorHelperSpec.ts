import { HmacValidatorHelper } from './HmacValidatorHelper'

describe('HmacValidatorHelper', () => {
  const secretKey = 'TEST_SECRET_KEY'
  const hmacContent = '821a9c5e1e6a26e65458c53790fe61baa5409d3e382ec03f2b2abe6328ad63d1'

  describe('checkHmacValidity', () => {
    it('should pass validation', () => {
      const isHmacValid = HmacValidatorHelper.checkHmacValidity(secretKey, {
        hmac: hmacContent,
        code: null,
        shop: null,
        state: null,
        timestamp: null,
      })
      expect(isHmacValid).toBe(true)
    })

    it('should not pass validation if provided wrong secret key', () => {
      const isHmacValid = HmacValidatorHelper.checkHmacValidity('WRONG_SECRET_KEY', {
        hmac: hmacContent,
        code: null,
        shop: null,
        state: null,
        timestamp: null,
      })
      expect(isHmacValid).toBe(false)
    })

    it('should not pass validation if provided null/undefined apiSecret or query', () => {
      const isNullHmacValid = HmacValidatorHelper.checkHmacValidity(null, null)
      const isUndefinedHmacValid = HmacValidatorHelper.checkHmacValidity(undefined, undefined)

      expect(isNullHmacValid).toBe(false)
      expect(isUndefinedHmacValid).toBe(false)
    })
  })
})
