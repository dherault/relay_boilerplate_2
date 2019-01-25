// eslint-disable-next-line
'use strict'

const { graphql } = require('graphql')
const schema = require('./src/schema')

module.exports.graphql = async event => {

  const headers = {
    'Access-Control-Allow-Origin': event.isOffline ? 'http://localhost:3000' : 'https://www.celestial.education',
    'Access-Control-Allow-Credentials': true,
  }

  if (event.body) {
    try {
      const input = JSON.parse(event.body)

      if (input.query) {
        console.log('\n__________\nNew query:\n', input.query)

        if (input.variables && Object.keys(input.variables).length) {
          console.log('\nVariables:\n', JSON.stringify(input.variables, null, 2))
        }
      }

      const context = {}

      return graphql(schema, input.query, null, context, input.variables).then(result => ({
        headers,
        statusCode: 200,
        body: JSON.stringify(result),
      }))
    }
    catch (err) {
      console.error(err)
    }
  }

  console.log('Malformed request', event.body)

  return {
    headers,
    statusCode: 400,
    body: JSON.stringify({
      message: 'Malformed request',
      input: event,
    }),
  }
}
