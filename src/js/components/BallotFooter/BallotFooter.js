import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './BallotFooter.css'

const ballotFooter = (props) => {

  let footerText = 'Oops! It looks like you haven\'t completed your oscar ballot'
  let footerIcon = <FontAwesomeIcon className={styles.footerIcon} icon="times-circle" color="#C93535" size="2x" />

  let textClasses = [styles.footerText]

  let venmo = null

  if (props.userSelections && Object.keys(props.userSelections).length === 24) {
    footerText = 'Bravo! You’ve completed your oscar ballot'
    footerIcon = <FontAwesomeIcon className={styles.footerIcon} icon="check-circle" color="#FFFFFF" size="2x" />
    textClasses.push(styles.footerTextSuccess)
    venmo = <div className={styles.payment}><img src='../../../images/venmo-icon.svg' alt='venmo-logo' />NEXT VENMO ALEX MARCHANT $5 <span className={styles.venmoHandle}> (@AMARCHANT) </span></div>
  }

  return (
    <div className={styles.BallotFooter}>
      <div className={styles.completeMessage}>
        {footerIcon}
        <p className={textClasses.join(' ')}>{footerText.toUpperCase()}</p>
      </div>
      {venmo}
    </div>
  )
}

export default ballotFooter
