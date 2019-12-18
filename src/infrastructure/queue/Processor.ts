export interface Processor<T> {
  process(done, job): T
}
