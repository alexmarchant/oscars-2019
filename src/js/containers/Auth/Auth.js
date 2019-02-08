import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import styles from './Auth.css'
import {connect} from 'react-redux'
import { authActions } from '../../_store/_actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
      passwordConfirmationInput =
      <div className={styles.inputContainer}>
        <FontAwesomeIcon className={styles.nomIcon} icon="unlock-alt" color="#D8D8D8" size="1x" />
        <input className={styles.formInput} type="password" onChange={this.handleChange} value={this.state.passwordConfirmation} name="passwordConfirmation" placeholder="Confirm Password"/>
      </div>
    }

    let error = null

    if (this.props.error) {
      error = <div>{this.props.error}</div>
    }

    return(
        <Modal show={!this.props.user}>
          <div className={styles.authContainer}>
          <div className={styles.instructions}>
            <div className={styles.instructionsHeader}>
              <div className={styles.horizontalRule}>&#8203;</div>
              <div className={styles.categoryTitle}>
                <h1>{'Instructions'.toUpperCase()}</h1>
              </div>
              <div className={styles.horizontalRule}>&#8203;</div>
            </div>
            <div>
              <ol>
                <li>Create Account/Sign in with email and password</li>
                <li>Select one winner for each category <span className={styles.red}>(points are weighted)</span></li>
                <li>Send $5 to Alex Marchant <span className={styles.red}>(@amarchant)</span> on Venmo </li>
              </ol>
            </div>
              <div className={styles.instructionsHeader}>
                <div className={styles.horizontalRule}>&#8203;</div>
                <div className={styles.categoryTitle}>
                  <h1>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
                </div>
                <div className={styles.horizontalRule}>&#8203;</div>
              </div>
            </div>
            <div className={styles.form}>
              <form onSubmit={this.onSubmitHandler} >
                <div className={styles.inputContainer}>
                  <FontAwesomeIcon className={styles.nomIcon} icon="envelope" color="#D8D8D8" size="1x" />
                  <input className={styles.formInput} type="email" onChange={this.handleChange} value={this.state.email}
                   name="email" placeholder="Email"/>
                </div>
                <div className={styles.inputContainer}>
                  <FontAwesomeIcon className={styles.nomIcon} icon="unlock-alt" color="#D8D8D8" size="1x" />
                  <input className={styles.formInput} type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password"/>
                </div>
                {passwordConfirmationInput}
                <input type="submit" />
              </form>
              <div className={styles.changeAuth} onClick={this.switchAuthModeHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</div>
            </div>
          </div>
        </Modal>
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
