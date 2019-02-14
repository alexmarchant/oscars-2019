import React from 'react'
import styles from './styles.css'

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(images/header_imgs/${image}.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%',
    display: 'inline-block',
    height: '100%',
    width: '100%',
  }
  return <div className="slide" style={styles}></div>
}

export default Slide;
