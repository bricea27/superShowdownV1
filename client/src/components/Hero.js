import React, { Component } from 'react';
import HeroImage from '../components/HeroImage.js';
import Powerstats from '../components/Powerstats.js';
import '../stylesheets/hero.css';

class Hero extends Component {

  render() {

    let heroClassName = (this.props.isProcessing) ? `hero loading` : `hero`;

    return(
      <div className={heroClassName}>
        <HeroImage index={this.props.index} url={(!!this.props.hero.image && this.props.hero.image.url) ? this.props.hero.image.url : ""} isProcessing={this.props.isProcessing} onHeroImageLoaded={this.props.onHeroImageLoaded} isProcessing={this.props.isProcessing} />
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
