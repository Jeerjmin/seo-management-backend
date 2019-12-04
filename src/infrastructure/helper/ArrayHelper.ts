import { MultiArray } from 'infrastructure/type/MultiArray'

export class ArrayHelper {
  static combineArrays<T>(arrays: MultiArray<T>): MultiArray<T> {
    let arraysCopy = []

    arrays.forEach(array => {
      arraysCopy = [...arraysCopy, ...array]
    })

    return arraysCopy
  }
}
