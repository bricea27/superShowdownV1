import React, { Component } from 'react';
import HeroImage from '../components/HeroImage.js';
import Powerstats from '../components/Powerstats.js';
import Score from '../components/Score.js';
import '../stylesheets/hero.css';

class Hero extends Component {

  render() {

    //check isProcessing, if true, return loader, else...
    return(
      <div className="hero">
        <HeroImage index={this.props.index} url={(!!this.props.hero.image && this.props.hero.image.url) ? this.props.hero.image.url : ""} isProcessing={this.props.isProcessing} onHeroImageLoaded={this.props.onHeroImageLoaded} isProcessing={this.props.isProcessing} />
        <div className='info'>
          <h1 className='name'>
            {(this.props.isProcessing) ? "" : this.props.hero.name}
            <Score powerstats={this.props.hero.powerstats} isProcessing={this.props.isProcessing} />
            <Powerstats powerstats={this.props.hero.powerstats} isProcessing={this.props.isProcessing} />
          </h1>
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
