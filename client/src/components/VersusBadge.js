import React, { Component } from 'react';
import Powerstats from '../components/Powerstats.js';
import Score from '../components/Score.js';
import '../stylesheets/versusBadge.css';

class VersusBadge extends Component {

  render() {

    if (this.props.isProcessing) {
      return(
        <div className='versus-badge-container loading'>
          <i className='fa fa-spinner fa-pulse'></i>
        </div>
      )
    } else {
      return(
        <div className='versus-badge-container'>
          <div className='versus-badge'>
            <div className='versus-badge-front'>VS</div>
            <div className='versus-badge-back' onClick={this.props.onClick}><i className='fa fa-random'></i></div>
          </div>
        </div>
      )
    }
  }

}

export default VersusBadge;
