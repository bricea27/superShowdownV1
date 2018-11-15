import React, { Component } from 'react';
import Logo from '../components/Logo.js';
import '../stylesheets/madeBy.css';

class MadeBy extends Component {

  render() {

    return(
      <a className='made-by' href='https://www.thebriceisright.com' rel="noopener noreferrer" target='_blank'><Logo /></a>
    )
  }
}

export default MadeBy;
