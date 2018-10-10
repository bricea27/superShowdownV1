import React, { Component } from 'react';
import HeroImage from '../components/HeroImage.js';
import Powerstats from '../components/Powerstats.js';
import '../stylesheets/hero.css';

class Hero extends Component {

  render() {

    let heroClassName = (this.props.isProcessing) ? `hero loading` : `hero`;
    let isWinner = (this.props.winner && this.props.winner !== "" && (this.props.winner.id === this.props.hero.id)) || this.props.winner === "tie";
    //if the showWinner prop is true, and the winner is defined and not an empty string, and its id matches this hero, add the declared class
    // if (this.props.showWinner && (this.props.winner && this.props.winner !== "" && (this.props.winner.id === this.props.hero.id)) || this.props.winner === "tie") heroClassName += " declared";
    if (isWinner && this.props.showWinner) heroClassName += " declared";

    return(
      <div className={heroClassName}>
        {isWinner &&
          <i className='fa fa-lock'></i>
        }
        <div className='winner' onClick={this.props.onClick}><i className='fa fa-trophy'></i>{this.props.winner && this.props.winner === 'tie' ? "It's a Tie!" : "Winner!"}</div>
        <HeroImage index={this.props.index} url={(!!this.props.hero.image && this.props.hero.image.url) ? this.props.hero.image.url : ""} isProcessing={this.props.isProcessing} onHeroImageLoaded={this.props.onHeroImageLoaded} />
        <div className='info--wrapper'>
          <div className='info'>
            <h2 className='name'>
              {(this.props.isProcessing) ? "" : this.props.hero.name}
              <span className='score'>{(this.props.hero.totalScore === 0) ? "?" : this.props.hero.totalScore}</span>
            </h2>
            <Powerstats powerstats={this.props.hero.powerstats} isProcessing={this.props.isProcessing} />
          </div>
        </div>
      </div>
    )
  }

}

Hero.defaultProps = {
  name: "",
  powerstats: {},
  image: {
    url: "",
  }
}


export default Hero;
