import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class SignInForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target

    AuthApiService.postLogin(
      user_name.value,
      password.value,
    )
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        window.location.href = '/home'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <div className="container-center">

        <div className="flex-container bkg-color-tra">
          <form
            className='LoginForm tx-a-c'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <h3>Please feel free to try out the app <br /> with demo credentials</h3>
            <h3>user name: painter99</h3>
            <h3>password: penny</h3>
            <div className='user_name pd-t-lg container-center'>
              <label className='pd-r-sm mg-sm ' htmlFor='LoginForm__user_name'>
                User name
          </label>
              <input className='Input' required name='user_name' id='signInForm_user_name' />
            </div>
            <div className='password  pd-t-sm'>
              <label className='pd-r-sm mg-sm' htmlFor='LoginForm__password'>
                Password
          </label>
              <input className='Input' required name='password' type='password' id='signInForm__password' />

            </div>
            <button className="mg-sm Button bkg-color-lt" type='submit'>
              Login
        </button>
          </form>
        </div>
      </div>
    )
  }
}
