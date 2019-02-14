import React from 'react';
import styles from './Alert.css'

const alert = (props) => {
  let error = null
  let classes = [styles.alert]
  if (props.error) {
    error = props.error
    console.log('there is an error');
    classes.push(styles.show)
  }

  return (
    <div className={classes.join(' ')}>
      {error}
    </div>
  )
}

export default alert;
