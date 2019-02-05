import React from 'react'
import styles from './Nominee.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const nominee = (props) => {
  let film = null;

  if (props.isPerson) {
    film = <p className={styles.nomineeFilm}>{props.film}</p>;
  }

  let nomIcon = <div>&#8203;</div>
  const borderClasses = [styles.Border]


  if (props.isSelected && !props.admin) {
    nomIcon = <FontAwesomeIcon icon="check-circle" color="#C5B318" size="2x" />
    borderClasses.push(styles.selectedNominee)
  }

  if (props.winners && props.winners[props.category] && props.isSelected) {
    nomIcon = <FontAwesomeIcon icon="times-circle" color="#C93535" size="2x" />

    borderClasses.push(styles.categoryComplete)
  }

  if (props.winners && props.winners[props.category] === props.name) {
    nomIcon = <FontAwesomeIcon icon="check-circle" color="green" size="2x" />

    borderClasses.push(styles.winnerBorder)
  }

  return(
    <div className={styles.nominee} onClick={(event)=> props.clicked(props.category, props.name, event)}>
      <div className={borderClasses.join(' ')}></div>
        <img className={styles.nomineeImage} src='../../../images/a-star-is-born.jpg' alt={props.name}/>
        <div className={styles.nomineeTextContainer}>
          <div className={styles.nomineeText}>
            <div>
              <p className={styles.nomineeName}>{props.name.toUpperCase()}</p>
              {film}
            </div>
          </div>
          {nomIcon}
        </div>
    </div>
  )
}

export default nominee;

// nomIcon = <FontAwesomeIcon icon="check-circle" color="#659D32" size="2x" />
