const config = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')

const baseUrl = './dist'
tsconfigPaths.register({
  baseUrl,
  paths: config.compilerOptions.paths,
})
