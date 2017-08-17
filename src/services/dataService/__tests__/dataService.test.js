const rethinkdbdash = require('rethinkdbdash')

const dataService = require('../index')
const dummyModelModel = require('./models/dummyModel')
const dummyModelModelTwo = require('./models/dummyModelTwo')
const dummyQuery = require('./queries/dummyQuery')
const dummyQueryTwo = require('./queries/dummyQueryTwo')

describe('data service', () => {
  const rethinkdb = rethinkdbdash()
  describe('rethinkdb param', () => {
    describe('is a config object', () => {
      it('returns a rethinkdb instance with provided config', () => {
        const ds = dataService({})
        expect(ds.r).to.be.a('function')
      })
    })
    describe('it is a rethinkdb client', () => {
      it('returns the same rethinkdb instance', () => {
        const ds = dataService(rethinkdb)
        expect(ds.r).to.be.a('function')
        expect(ds.r).to.be.eql(rethinkdb)
      })
    })
    it('throws an error if null', () => {
      expect(dataService).to.throw('rethinkdb parameter config or client is required')
    })

    it('throws an error if not a config object or a rethinkdb client', () => {
      expect(() => dataService('yu')).to.throw('first parameter must be a config object or client')
    })
  })
  describe('options param', () => {
    describe('models', () => {
      it('throws an error if not file path or array', () => {
        expect(() => dataService(rethinkdb, {models: 5})).to.throw('options.models must be a path to directory or array of model definition functions')
      })
      describe('is a file path', () => {
        it('returns thinky models', () => {
          const options = {models: __dirname + '/models'}
          const ds = dataService(rethinkdb, options)
          expect(ds).to.have.own.property('DummyModel')
          expect(ds).to.have.own.property('DummyModelTwo')
        })
      })
      describe('is an array', () => {
        it('returns thinky models', () => {
          const options = {models: [dummyModelModel, dummyModelModelTwo]}
          const ds = dataService(rethinkdb, options)
          expect(ds).to.have.own.property('DummyModel')
          expect(ds).to.have.own.property('DummyModelTwo')
        })
      })
      //test thinky model associations and timestamp updates
    })
    describe('queries', () => {
      it('throws an error if not file path or array', () => {
        expect(() => dataService(rethinkdb, {queries: 5})).to.throw('options.queries must be a path to directory or array of query functions')
      })
      describe('is a file path', () => {
        it('returns query functions contained within the data service object', () => {
          const options = {queries: __dirname + '/queries'}
          const ds = dataService(rethinkdb, options)
          expect(ds).to.have.own.property('dummyQuery')
          expect(ds).to.have.own.property('dummyQueryTwo')
        })
      })
      describe('is an array', () => {
        it('returns query functions contained within the data service object', () => {
          const options = {queries: [dummyQuery, dummyQueryTwo]}
          const ds = dataService(rethinkdb, options)
          expect(ds).to.have.own.property('dummyQuery')
          expect(ds).to.have.own.property('dummyQueryTwo')
        })
      })
    })
  })
})
