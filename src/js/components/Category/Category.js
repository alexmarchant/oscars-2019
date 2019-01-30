import React from 'react';
import Nominee from '../Nominee/Nominee';
import PropTypes from 'prop-types'
import styles from './Category.css'

const category = (props) => {

  const isPerson = (title) => {

    return (
      title === "Director" ||
      title === "Actor in a Leading Role" ||
      title === "Actress in a Leading Role" ||
      title === "Actor in a Supporting Role" ||
      title === "Actress in a Supporting Role" ||
      title === "Original Song"
    )
  }

  const nominees = props.nominees.map((nom, index)=> {
    return <Nominee
      key={index}
      category={props.title}
      name={nom.name}
      film={nom.film}
      isPerson={isPerson(props.title)}
      clicked={props.clicked}
      isSelected={nom.selected}
      />
  })

  return (
    <div>
      <div className={styles.categoryHeader}>
        <div className={styles.horizontalRule}>&#8203;</div>
        <p className={styles.categoryTitle}>{props.title.toUpperCase()}</p>
        <div className={styles.horizontalRule}>&#8203;</div>
      </div>

      {nominees}
    </div>
  )
};

// category.propTypes = {
//   name: PropTypes.string.isRequired,
//   film: PropTypes.string.isRequired,
//   test: PropTypes.string.isRequired
// }
//


export default category
