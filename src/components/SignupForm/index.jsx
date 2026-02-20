import {Component} from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import signupimg from '../../assets/signup.png'
import './index.css'

class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    number: '',
    repassword: '',
    redirect: false,
    showSubmitError: false,
    errorMsg: '',
    redirectToSignup: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangenumber = event => {
    this.setState({number: event.target.value})
  } 

  onChangeRePassword = event => {
    this.setState({repassword: event.target.value})
  }
  
  onSubmitSuccess = jwtToken => {

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    this.setState({redirect: true})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password, number, repassword} = this.state
    if(password !== repassword){
      this.onSubmitFailure("Passwords do not match")
      return
    }
    const userDetails = {username, password, number, repassword}
    const url = 'https://ecomreactapi.onrender.com/signup'
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {       
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderrePasswordField = () => {
    const {repassword} = this.state

    return (
      <>
        <label className="input-label" htmlFor="repassword">
          RE-ENTER PASSWORD
        </label>
        <input
          type="password"
          id="repassword"
          className="password-input-field"
          value={repassword}
          onChange={this.onChangeRePassword}
          placeholder="Re-enter Password"
        />
      </>
    )
  }

  rendernumberField = () => {
    const {number} = this.state

    return (
      <>
        <label className="input-label" htmlFor="number">
          MOBILE NUMBER
        </label>
        <input
          type="text"
          id="number"
          className="username-input-field"
          value={number}
          onChange={this.onChangenumber}
          placeholder="Mobile Number"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  redirecttosignup = ()=>{
    this.setState({redirectToSignup: true})
}

  render() {
    const {showSubmitError, errorMsg, redirect, redirectToSignup} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (redirectToSignup) {
      return <Navigate to="/login" replace />
    }

    if (jwtToken !== undefined || redirect) {
    return <Navigate to="/" replace />
  }

    return (
      <div className="signup-main-container">
      <div className="login-form-container-sign">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src={signupimg}
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.rendernumberField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderrePasswordField()}</div>
          <button type="submit" className="login-button">
            Signup
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <p className='orpara'>or</p>
          <button type="button" className="guest-login-button" onClick={this.redirecttosignup}>Login</button>
        </form>
      </div>
      </div>
    )
  }
}

export default SignupForm
