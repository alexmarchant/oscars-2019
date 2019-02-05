import React from 'react';
import Nominee from '../Nominee/Nominee';
import { points } from '../../../data/winners'

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
      admin={props.admin}
      winners={props.winners}
      />
  })

  return (
    <div className={styles.category}>
      <div className={styles.categoryHeader}>
        <div className={styles.horizontalRule}>&#8203;</div>
          <div className={styles.categoryTitle}>
            <p>{props.title.toUpperCase()}</p>
            <p className={styles.categoryPoints}>{points[props.title]} points</p>
          </div>
        <div className={styles.horizontalRule}>&#8203;</div>
      </div>
      <div className={styles.nominees}>
        {nominees}
      </div>
    </div>
  )
};

export default category
