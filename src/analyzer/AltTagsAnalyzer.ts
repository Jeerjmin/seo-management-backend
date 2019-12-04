import { AbstractAnalyzer } from './AbstractAnalyzer'

export class AltTagsAnalyzer extends AbstractAnalyzer {
  protected async compute(_data: any) {
    const data = await _data
    this.results = data

    return super.compute(data)
  }
}
