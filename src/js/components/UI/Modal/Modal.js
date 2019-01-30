import React from 'react'
import styles from './Modal.css'

const modal = (props) => {

  const classes = [styles.Modal]

  if (props.show) {
    classes.push(styles.show)
  }
  return (
    <div className={classes.join(' ')}>{props.children}</div>
  )
}

export default modal;
