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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.prevState, this.state);
    // if (this.state.hero1Processing == false && this.state.hero2Processing == false) this.setState({ heroesProcessing: false });
  }

  loadHero1(id) {
    this.setState({ hero1Processing: true });
    if (!id) id = getRandomId();
    fetch("/hero/" + id)
      .then(res => res.json())
      .then(hero => {
        hero.totalScore = this.calculateScore(hero);
        this.setState({ hero1: hero })
      });
  }

  loadHero2(id) {
    this.setState({ hero2Processing: true });
    if (!id) id = getRandomId();
    fetch("/hero/" + id)
      .then(res => res.json())
      .then(hero => {
        hero.totalScore = this.calculateScore(hero);
        this.setState({ hero2: hero })
      });
  }

  calculateScore(hero) {
    //extract powerstat keys into an array for easy mapping
    let powerStats = Object.keys(hero.powerstats);
    let totalScore = 0;
    powerStats.forEach(stat => {
      let statScore = (hero.powerstats[stat] === "null") ? 0 : parseInt(hero.powerstats[stat]);
      totalScore += statScore;
    });
    return Math.round(totalScore / 6);
  }

  shuffleHeroes = () => {
    if (this.state.hero1.totalScore === this.state.hero2.totalScore) {
      this.loadHero1();
      this.loadHero2();
    }

    if (this.state.hero1.totalScore > this.state.hero2.totalScore) {
      this.loadHero2();
      return;
    }

    this.loadHero1();
  }

  onHeroImageLoaded = (heroIndex) => {
    if (heroIndex === "1") {
      this.setState({ hero1Processing: false });
      return;
    }

    this.setState({ hero2Processing: false });
  }

  render() {

    //we want to render the heroes at the same time - if either is stil processing, this value will be true
    let heroesProcessing = (this.state.hero1Processing || this.state.hero2Processing);

    return (
      <div className="App">
        <header>
          <h1><i className="fa fa-star"></i>Super Showdown<i className="fa fa-star"></i></h1>
        </header>
        <section className="heroes">
          <Hero index="1" hero={this.state.hero1} isProcessing={this.state.hero1Processing} onHeroImageLoaded={this.onHeroImageLoaded} />
          <VersusBadge isProcessing={(heroesProcessing) ? true : false} onClick={this.shuffleHeroes} />
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
