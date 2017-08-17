function dummyModelModel(thinky) {
  const {type: {string}} = thinky
  return {
    name: 'DummyModel',
    table: 'dummys',
    schema: {
      id: string()
        .uuid(4)
        .allowNull(false),
    },
  }
}

module.exports = dummyModelModel
