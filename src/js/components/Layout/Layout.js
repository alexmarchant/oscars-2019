import React from 'react';
import Aux from '../hoc/Aux';
import Auth from '../../containers/Auth/Auth';
import { Link } from 'react-router-dom'
import styles from './Layout.css';

const layout = (props) => {
  return (
    <Aux>
      <div>Header, Menu, etc.</div>
      <main>
        {props.children}
      </main>
    </Aux>
  )
}

export default layout;
