const autoloader = require('auto-loader')

function autoloadFunctions(directoryPath) {
  const moduleExports = autoloader.load(directoryPath)
  return Object.keys(moduleExports).reduce((result, key) => {
    if (typeof moduleExports[key] === 'function') {
      result[key] = moduleExports[key]
    }
    return result
  }, {})
}

module.exports = autoloadFunctions
