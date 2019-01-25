import React from 'react'
import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import environment from '../../relayEnvironment'

import AuthenticationScene from './AuthenticationScene'

const AuthenticationSceneWrapper = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AuthenticationSceneWrapperQuery {
        viewer {
          ...AuthenticationScene_viewer
        }
      }
    `}
    variables={{}}
    render={({ error, props }) => {
      if (error) return <div>Error!</div>
      if (!props) return <div>Loading...</div>

      return <AuthenticationScene {...props} />
    }}
  />
)

export default AuthenticationSceneWrapper
