function dummyModelModelTwo(thinky) {
  const {type: {string}} = thinky
  return {
    name: 'DummyModelTwo',
    table: 'dummysTwo',
    schema: {
      id: string()
        .uuid(4)
        .allowNull(false),
    },
  }
}

module.exports = dummyModelModelTwo
