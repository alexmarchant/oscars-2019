import React, {Component} from 'react';

class Auth extends Component {

  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    isSignUp: true
  }

  emailHandler = (event) => {
    let email = event.target.value;
    this.setState({
      email: email
    })
  }

  passwordHandler = (event) => {
    let password = event.target.value;
    this.setState({
      password: password
    })
  }

  passwordConfirmationHandler = (event) => {
    let passwordConfirmation = event.target.value;
    this.setState({
      passwordConfirmation: passwordConfirmation
    })
  }

  onSubmitHandler = (event) => {
    event.preventDefault()

    let fetchUrl = ''

    if (this.state.isSignUp) {
      fetchUrl = 'http://api.oscars.alexmarchant.com/users'
    } else if (!this.state.isSignup) {
      fetchUrl = 'http://api.oscars.alexmarchant.com/tokens'
    }

    let data = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    }

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((data)=> this.setLocalStorageHandler(data))
      .catch((data)=> console.error(data))
  }

  setLocalStorageHandler = (data) => {
    localStorage.setItem('token', data.token)
  }

  switchAuthModeHandler = () => {
    event.preventDefault();

    let isSignUp = this.state.isSignUp;

    this.setState({
      isSignUp: !isSignUp
    })
  }

  render(){

    let passwordConfirmationInput = ''

    if (this.state.isSignUp) {
      passwordConfirmationInput = <input type="password" onChange={this.passwordConfirmationHandler} value={this.state.passwordConfirmation}/>
    }
    
    return(
      <div>
        <form onSubmit={this.onSubmitHandler} >
          <input type="email" onChange={this.emailHandler} value={this.state.email}/>
          <input type="password" onChange={this.passwordHandler} value={this.state.password}/>
          {passwordConfirmationInput}
          <input type="submit" />
        </form>

        <button onClick={this.switchAuthModeHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
      </div>
    )
  }
}

export default Auth;
