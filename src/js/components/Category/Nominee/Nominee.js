import React from 'react'
import styles from './Nominee.css'

const nominee = (props) => {
  let film = null;

  if (props.isPerson) {
    film = <p className={styles.nomineeFilm}>{props.film}</p>;
  }

  let selectedIcon = <div>&#8203;</div>
  const classes = [styles.nominee]

  if (props.isSelected) {
    selectedIcon = <img className={styles.selectedNomineeIcon} src='../../../images/checked-symbol.png' alt="selected" />
    classes.push(styles.selectedNominee)
  }

  return(
    <div className={classes.join(' ')} onClick={(event)=> props.clicked(props.category, props.name, event)}>
      <div className={styles.yellowBorder}></div>
        <img className={styles.nomineeImage} src='../../../images/a-star-is-born.jpg' alt={props.name}/>
        <div className={styles.nomineeTextContainer}>
          <div className={styles.nomineeText}>
            <div>
              <p className={styles.nomineeName}>{props.name.toUpperCase()}</p>
              {film}
            </div>
          </div>
          {selectedIcon}
        </div>
    </div>
  )
}

export default nominee;

// return(
//   <div>
//     <label>
//       <input
//         type="radio"
//         name={props.category}
//         id={props.name}
//         value={props.name}
//       />
//       {props.name}
//       <p>{film}</p>
//       <img src='../../../images/a-star-is-born.jpg' href={props.name}/>
//     </label>
//   </div>
// )
