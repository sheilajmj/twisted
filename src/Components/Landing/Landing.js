import React, { Component } from 'react';
import Context from '../../Context'
// import PatternCard from '../PatternCard/PatternCardEdit';


class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <>
      <section className="landing">
        <div className="bkg-color-wt landing">
          <div className="landing-text-wrap landing-wrap">
            <p className="ta-c landing-text-item"> Twisted is a web application designed to enable yarn lovers to collect, save and explore patterns.</p>
        </div>      
        </div>
        <button className="start-btn btn" onClick={() => { this.context.history.push('/home') }}>Get Started</button>
      </section>
      <section className="image-landing">
      </section>
      </>
    );
  }
}

export default LandingPage;