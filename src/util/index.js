const autoloader = require('auto-loader')

function sleep (fn, time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), time)
  })
}

function autoloadFunctions(directoryPath) {
  const moduleExports = autoloader.load(directoryPath)
  return Object.keys(moduleExports).reduce((result, key) => {
    if (typeof moduleExports[key] === 'function') {
      result[key] = moduleExports[key]
    }
    return result
  }, {})
}

function resetDB(r) {
  // truncating tables can sometimes take a long time
  // see: https://github.com/rethinkdb/rethinkdb/issues/134
  // this.timeout(30000)
  return _truncateTables(r)
}

function _truncateTables(r) {
  return r.tableList()
    .then(tables => tables.filter(table => !table.startsWith('_')))
    .then(tablesToTruncate => Promise.all(tablesToTruncate.map(table => r.table(table).delete().run())))
}

module.exports = {
  sleep,
  resetDB,
  autoloadFunctions
}
