import { Injectable } from '@nestjs/common'
import { Analyzer } from './Analyzer'
import { AnalyzerType } from './AnalyzerType'

@Injectable()
export class AnalyzerRegistry {
  private readonly analyzers: Map<AnalyzerType, Analyzer> = new Map<AnalyzerType, Analyzer>()

  register(...analyzers: Array<{ type: AnalyzerType; instance: Analyzer }>): void {
    analyzers.forEach(analyzer => {
      this.analyzers.set(analyzer.type, analyzer.instance)
    })
  }

  getAnalyzer(analyzerType: AnalyzerType) {
    return this.analyzers.get(analyzerType)
  }

  getAllAnalyzers() {
    return new Map<AnalyzerType, Analyzer>(this.analyzers)
  }
}
