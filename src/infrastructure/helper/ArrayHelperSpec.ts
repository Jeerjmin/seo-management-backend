import { ArrayHelper } from './ArrayHelper'

describe('ArrayHelper', () => {
  const firstPrimitiveArray = [1, 2, 3]
  const secondPrimitiveArray = [4, 5, 6]

  describe('combineArrays', () => {
    it('should spread n arrays to one', () => {
      const combinedArray = ArrayHelper.combineArrays([firstPrimitiveArray, secondPrimitiveArray])
      expect(combinedArray).toStrictEqual([1, 2, 3, 4, 5, 6])
      expect(combinedArray).not.toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should return empty array when empty array provided', () => {
      const combinedArray = ArrayHelper.combineArrays([])
      expect(combinedArray).toStrictEqual([])
    })

    it('should return empty array when null or undefined provided', () => {
      const combinedNullArray = ArrayHelper.combineArrays(null)
      const combinedUndefinedArray = ArrayHelper.combineArrays(undefined)

      expect(combinedNullArray).toStrictEqual([])
      expect(combinedUndefinedArray).toStrictEqual([])
    })
  })
})
