const config = {
  graphqlEndpointUrl: process.env.NODE_ENV === 'production' ?
    'https://apqvhe4wk2.execute-api.eu-west-3.amazonaws.com/dev/graphql' :
    'http://localhost:5000/graphql',
}

export default config
