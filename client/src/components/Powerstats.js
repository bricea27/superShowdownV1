import React, { Component } from 'react';
import Stat from '../components/Stat.js';
import '../stylesheets/powerstats.css';

class Powerstats extends Component {

  render() {

    //extract powerstat keys into an array for easy mapping
    let powerStats = Object.keys(this.props.powerstats);


    return(
      <ul className="powerstats">
        {
          //return an li element for each key in the powerStats array
          powerStats.map((powerStat, index) => {

            let stat = {
              index: index,
              name: powerStat,
              value: this.props.powerstats[powerStat]
            };

            return (
              <Stat key={index} stat={stat} isProcessing={this.props.isProcessing} />
            )
          })
        }
      </ul>
    )
  }

}

Powerstats.defaultProps = {
  powerstats: {
    combat: "",
    durability: "",
    intelligence: "",
    power: "",
    speed: "",
    strength: "",
  }
}

export default Powerstats;
