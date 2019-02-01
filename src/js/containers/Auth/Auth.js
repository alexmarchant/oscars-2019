import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import {connect} from 'react-redux'
import { authActions } from '../../_store/_actions'

class Auth extends Component {

  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    isSignUp: true,
  }

  componentWillMount() {
    this._isAuthenticated()
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  onSubmitHandler = (event) => {
    event.preventDefault()

    const authData = {
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      isSignUp: this.state.isSignUp
    }

    this.props.initAuth(authData)
  }

  switchAuthModeHandler = () => {
    event.preventDefault();

    let isSignUp = this.state.isSignUp;

    this.setState( prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  _isAuthenticated = () => {
    this.props.isAuthenticated()
  }

  render(){

    let passwordConfirmationInput = '';

    if (this.state.isSignUp) {
      passwordConfirmationInput = <input type="password" onChange={this.handleChange} value={this.state.passwordConfirmation} name="passwordConfirmation" />
    }

    let error = null

    if (this.props.error) {
      error = <div>{this.props.error}</div>
    }

    return(
      <div>
        <Modal show={!this.props.user}>
          {error}
          <form onSubmit={this.onSubmitHandler} >
            <input type="email" onChange={this.handleChange} value={this.state.email} name="email"/>
            <input type="password" onChange={this.handleChange} value={this.state.password} name="password"/>
            {passwordConfirmationInput}
            <input type="submit" />
          </form>
          <button onClick={this.switchAuthModeHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.authentication.error,
    user: state.authentication.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initAuth: (authData)=> dispatch(authActions.initAuth(authData)),
    isAuthenticated: ()=> dispatch(authActions.isAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
