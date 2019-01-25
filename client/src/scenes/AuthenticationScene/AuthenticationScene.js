import React, { Component } from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import './AuthenticationScene.css'

class AuthenticationScene extends Component {

  state = {
    adminPassword: '1234',
  }

  handleSubmit = () => {
    const { adminPassword } = this.state

    console.log('adminPassword:', adminPassword)
  }

  render() {
    const { adminPassword } = this.state

    return (
      <div className="AuthenticationScene">
        <div className="mx-auto text-center">
          <h1>Celestial.education</h1>
          <form
            className="mt-4"
            onSubmit={this.handleSubmit}
          >
            <div>
              <strong>Admin sign in</strong>
            </div>
            <div className="mt-2">
              <input
                type="password"
                value={adminPassword}
                onChange={e => this.setState({ adminPassword: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                onClick={this.handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(AuthenticationScene, graphql`
  fragment AuthenticationScene_viewer on User {
    name
  }
`)
