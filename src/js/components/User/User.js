import React from 'react';
import styles from './User.css'

const user = (props) => {

  return (
    <tr>
      <td className={styles.rank}>{props.rank}</td>
      <td>{props.user.email}</td>
      <td>{props.user.correct}/24</td>
      <td>{props.score}</td>
      <td>$</td>
    </tr>
  )
}

export default user;
