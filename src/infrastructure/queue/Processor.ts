export interface Processor<T> {
  process(done, ...data: any): T
}
