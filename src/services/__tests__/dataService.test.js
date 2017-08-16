import rethinkdbdash from 'rethinkdbdash'

import dataService from '../dataService'

describe('dataService', () => {
  it('constructs a data service when given a config', () => {
    expect(dataService({}).r).to.be.a('function')
  })
  it('constructs a data service when given a rethinkdb client', () => {
    const r = rethinkdbdash()

    expect(dataService(r).r).to.be.eql(r)
    expect(dataService(r).r).to.be.a('function')
  })
})
