const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { nodeDefinitions, globalIdField, fromGlobalId } = require('graphql-relay')

const data = [
  {
    id: 'viewer',
    type: 'User',
    name: 'John Doe',
  },
]

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { /* type, */ id } = fromGlobalId(globalId)

    return data.find(item => item.id === id)
  },
  obj => obj.type === 'User' ? UserType : null,
)

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField(),
    name: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      viewer: {
        type: UserType,
        resolve: () => data[0],
      },
      node: nodeField,
    },
  }),
})

module.exports = schema
