import React, { Component } from 'react';
import '../stylesheets/stat.css';

class Stat extends Component {
  render() {

    let statIcon = 'fa fa-lightbulb';
    if (this.props.stat.name === "strength") statIcon = 'fa fa-dumbbell';
    if (this.props.stat.name === "speed") statIcon = 'fa fa-tachometer-alt';
    if (this.props.stat.name === "durability") statIcon = 'fa fa-shield-alt';
    if (this.props.stat.name === "power") statIcon = 'fa fa-bolt';
    if (this.props.stat.name === "combat") statIcon = 'fa fa-hand-rock';

    if (this.props.isProcessing) {
      return (
        <li key={this.props.stat.index} className='stat processing'></li>
      )
    } else {
      return (
        <li key={this.props.stat.index} className='stat'>
          <i className={statIcon}></i>
          <span className='statName'>{this.props.stat.name}</span>
          <span className='statValue'>{(this.props.stat.value === "null") ? "?" : this.props.stat.value}</span>
        </li>
      )
    }
  }
}

export default Stat;

Stat.defaultProps = {
  stat: {
    index: "",
    name: "",
    value: "",
  }
}
