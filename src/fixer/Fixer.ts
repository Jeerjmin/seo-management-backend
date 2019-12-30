export interface Fixer {
  fix(args): Promise<void>
}
