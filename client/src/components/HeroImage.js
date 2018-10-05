import React, { Component } from 'react';
import '../stylesheets/hero.css';

class HeroImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageFailed: false
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.url !== prevProps.url) this.setState({ imageFailed: false });
  }

  handleImageError = () => {
    this.setState({ imageFailed: true });
  }

  heroImageLoaded = () => {
    this.props.onHeroImageLoaded(this.props.index);
  }

  render() {

    let imageDisplay = {
      display: ""
    }

    if (this.props.isProcessing) imageDisplay.display = "none";

    return(
      <div className='hero-img'>
        {!!this.props.url &&
          <img src={(this.state.imageFailed == false) ? this.props.url : "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/RonSwanson.jpg/250px-RonSwanson.jpg"} onError={this.handleImageError} onLoad={this.heroImageLoaded} style={imageDisplay} />
        }
      </div>
    )
  }

}

HeroImage.defaultProps = {
  url: "",
  isProcessing: true,
}

export default HeroImage;
