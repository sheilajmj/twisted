import React, { Component } from 'react';
import Context from '../../Context'


class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <section className="landing">
        <div className="flex-container bkg-color-wt landing">
          <div className="landing-text landing-wrap">
            <h2 className="welcome align-center color-p">Welcome!</h2>
        Twisted is a web application designed to enable yarn lovers to collect, save and explore patterns.
        </div>
        </div>
        <button className="start-btn" onClick={() => { this.context.history.push('/home') }}>Get Started</button>
      </section>
    );
  }
}

export default LandingPage;