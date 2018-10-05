import React, { Component } from 'react';
import logo from './logo.svg';
import Hero from './components/Hero';
import VersusBadge from './components/VersusBadge';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hero1: {},
      hero2: {},
      hero1Processing: true,
      hero2Processing: true,
    }
  }

  componentDidMount() {
    this.loadHero1();
    this.loadHero2();
  }

  loadHero1(id) {
    this.setState({ hero1Processing: true });
    if (!id) id = getRandomId();
    fetch("/hero/" + id)
      .then(res => res.json())
      .then(hero => {
        console.log(hero);
        this.setState({ hero1: hero })
        this.setState({ hero1Processing: false });
      });
  }

  loadHero2(id) {
    this.setState({ hero2Processing: true });
    if (!id) id = getRandomId();
    fetch("/hero/" + id)
      .then(res => res.json())
      .then(hero => {
        console.log(hero);
        this.setState({ hero2: hero })
      });
  }

  shuffleHeroes = () => {
    this.loadHero1();
    this.loadHero2();
  }

  onHeroImageLoaded = (heroIndex) => {
    if (heroIndex === "1") {
      this.setState({ hero1Processing: false });
      return;
    }
    this.setState({ hero2Processing: false });
  }

  render() {

    return (
      <div className="App">
        <header>
          <h1><i className="fa fa-star"></i>Super Showdown<i className="fa fa-star"></i></h1>
        </header>
        <section className="heroes">
          <Hero index="1" hero={this.state.hero1} isProcessing={this.state.hero1Processing} onHeroImageLoaded={this.onHeroImageLoaded} />
          <VersusBadge isProcessing={(this.state.hero1Processing || this.state.hero1Processing) ? true : false} onClick={this.shuffleHeroes} />
          <Hero index="2" hero={this.state.hero2} isProcessing={this.state.hero2Processing} onHeroImageLoaded={this.onHeroImageLoaded} />
        </section>
      </div>
    );
  }
}

function getRandomId() {
  return Math.round(Math.random() * (731 - 1) + 1);
}

export default App;
