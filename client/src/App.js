import React, { Component } from 'react';
import MadeBy from './components/MadeBy';
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
      winner: "",
      showWinner: false,
    }
    this.winnerTimeoutId = null;
    // this.declareWinner = this.declareWinner.bind(this);
  }

  componentDidMount() {
    this.loadHero1();
    this.loadHero2();
  }

  componentWillUnmount() {
    clearTimeout(this.winnerTimeoutId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //once both heroes have fully loaded, let's declare a winner!
    if (((prevState.hero1Processing !== this.state.hero1Processing) || (prevState.hero2Processing !== this.state.hero2Processing)) && (!this.state.hero1Processing && !this.state.hero2Processing)) {
      this.winnerTimeoutId = setTimeout(this.declareWinner, 500);
    }
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
    //return the average score
    return Math.round(totalScore / powerStats.length);
  }


  //shuffles the heroes when the versus badge is clicked
  shuffleHeroes = () => {

    //clear the winner timeout and value
    clearTimeout(this.winnerTimeoutId);
    this.setState({ winner: "" });

    //if heroes have the same score, reload both
    if (this.state.hero1.totalScore === this.state.hero2.totalScore) {
      this.loadHero1();
      this.loadHero2();
    }

    //if hero 1 scored higher than hero 2, reload hero 2
    if (this.state.hero1.totalScore > this.state.hero2.totalScore) {
      this.loadHero2();
      return;
    }

    //default to loading hero 1
    this.loadHero1();
  }

  onHeroImageLoaded = (heroIndex) => {
    this.setState({ [`hero${heroIndex}Processing`]: false });
  }

  hideWinnerLabel = () => {
    this.setState({ showWinner: false });
  }

  declareWinner = () => {
    let winner;
    if (this.state.hero1.totalScore === this.state.hero2.totalScore) {
      winner = "tie";
    } else if (this.state.hero1.totalScore >this.state.hero2.totalScore) {
      winner = this.state.hero1;
    } else if (this.state.hero1.totalScore < this.state.hero2.totalScore) {
      winner = this.state.hero2;
    } else {
      winner = "";
    }
    this.setState({ winner: winner });
    this.setState({ showWinner: true });
  }

  render() {

    //if either hero is stil processing, this value will be true
    let heroesProcessing = (this.state.hero1Processing || this.state.hero2Processing);

    return (
      <div className="App">
        <header>
          <MadeBy />
          <h1><i className="fa fa-star"></i>Super Showdown<i className="fa fa-star"></i></h1>
        </header>
        <section className="heroes">
          <Hero index="1" hero={this.state.hero1} isProcessing={this.state.hero1Processing} onHeroImageLoaded={this.onHeroImageLoaded} winner={this.state.winner} showWinner={this.state.showWinner} onClick={this.hideWinnerLabel} />
          <VersusBadge isProcessing={(heroesProcessing) ? true : false} onClick={this.shuffleHeroes} />
          <Hero index="2" hero={this.state.hero2} isProcessing={this.state.hero2Processing} onHeroImageLoaded={this.onHeroImageLoaded} winner={this.state.winner} showWinner={this.state.showWinner} onClick={this.hideWinnerLabel} />
        </section>
      </div>
    );
  }
}

function getRandomId() {
  return Math.round(Math.random() * (731 - 1) + 1);
}

export default App;
