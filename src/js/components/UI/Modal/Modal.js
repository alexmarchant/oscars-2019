import React from 'react'
import styles from './Modal.css'

const modal = (props) => {

  const classes = [styles.Modal]
  const backdropClasses = [styles.backdrop]

  if (props.show) {
    classes.push(styles.show)
  } else {
    backdropClasses.push(styles.hideBackdrop)
  }

  return (
    <div>
      <div className={backdropClasses.join(' ')}></div>
      <div className={classes.join(' ')}>
        {props.children}
      </div>
    </div>
  )
}

export default modal;
