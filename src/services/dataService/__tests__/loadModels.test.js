import rethinkdbdash from 'rethinkdbdash'

import loadModels from '../loadModels'

describe('creates thinky models from array', () => {
  it('returns thinky models', () => {
    const r = rethinkdbdash()
    const models = loadModels([modelModel], r)

    expect(models.r).to.be.an('function')
    expect(models.hasOwnProperty('Model')).to.be.true
  })
})

function modelModel(thinky) {
  const {type: {string}} = thinky
  return {
    name: 'Model',
    table: 'models',
    schema: {
      id: string()
        .uuid(4)
        .allowNull(false),
    },
  }
}
