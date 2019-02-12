import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Aux from '../hoc/Aux'

import styles from './BallotFooter.css'

const ballotFooter = (props) => {

  function ballotComplete(){
    return props.userSelections && Object.keys(props.userSelections).length === 24
  }

  let incompleteText = 'Oops! It looks like you haven\'t completed your oscar ballot'
  let completeText = 'Bravo! You’ve completed your oscar ballot'

  let incompleteIcon = <FontAwesomeIcon className={styles.footerIcon} icon="times-circle" color="#C93535" size="2x" />
  let completeIcon = <FontAwesomeIcon className={styles.footerIcon} icon="check-circle" color="#FFFFFF" size="2x" />

  let nextSteps = 'NEXT VENMO ALEX MARCHANT $5'
  let venmoHandle = '@AMARCHANT'

  if (props.user && props.user.paid) {
    nextSteps = 'YOU\'RE ALL SET! LET US KNOW IF YOU HAVE ANY QUESTIONS.'
    venmoHandle = null
  }

  let complete = (
    <Aux>
      <div className = {styles.complete}>
        {completeIcon}
        <p className={styles.footerText}>{completeText.toUpperCase()}</p>
      </div>
      <div className={styles.payment}>
        <div className={styles.paymentLeft}>
          <img className={styles.footerIcon} src='../../../images/venmo-icon.svg' alt='venmo-logo' />
          <div className={styles.paymentRight}>
            <p className={styles.footerText}>{nextSteps}</p>
            <div className={styles.venmoHandle}>{venmoHandle}</div>
          </div>
        </div>
        <input onChange={props.paymentHandler} type="checkbox" checked={props.user && props.user.paid} />
      </div>
    </Aux>

  )

  let incomplete = (
    <div className={styles.incomplete}>
      {incompleteIcon}
      <p className={styles.footerText}>{incompleteText.toUpperCase()}</p>
    </div>
  )

  let display = incomplete

  if (ballotComplete()) {
    display = complete
  }

  return (
    <div className={styles.ballotFooter}>
      {display}
    </div>
  )
}

export default ballotFooter
