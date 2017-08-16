import rethinkdbdash from 'rethinkdbdash'

import {autoloadFunctions} from '../../util'
import loadModels from './loadModels'

export default function dataService(rethinkdb, options) {
  const r = typeof rethinkdb === 'function' ?
    rethinkdb : rethinkdbdash(rethinkdb)

  let {models, queries} = options || {}

  models = models && (models instanceof Array ?
    loadModels(models, r) :
    autoloadFunctions(models))
  queries = queries && (queries instanceof Array ?
    queries :
    autoloadFunctions(queries))

  return {r, ...models, ...queries}
}
