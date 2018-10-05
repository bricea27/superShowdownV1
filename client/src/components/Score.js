import React, { Component } from 'react';
import '../stylesheets/score.css';

class Score extends Component {
  render() {

    if (this.props.isProcessing) {

      return (
        <span className='score processing'></span>
      )

    } else {
      //extract powerstat keys into an array for easy mapping
      let powerStats = Object.keys(this.props.powerstats);
      let totalScore = 0;
      powerStats.forEach(stat => {
        let statScore = (this.props.powerstats[stat] === "null") ? 0 : parseInt(this.props.powerstats[stat]);
        totalScore += statScore;
      });
      totalScore = Math.round(totalScore / 6);

      return (
        <span className='score'><i className='fa fa-star'></i>{ (totalScore === 0) ? "?" : totalScore }<i className='fa fa-star'></i></span>
      )
    }
  }
}

export default Score;

Score.defaultProps = {
  powerstats: {
    combat: "",
    durability: "",
    intelligence: "",
    power: "",
    speed: "",
    strength: "",
  }
}
