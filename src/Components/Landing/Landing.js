import React, { Component } from 'react';
import Context from '../../Context';

class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <>
      <section className="landing container pd-t-md container-sm">
        <div className="landing">
          <div className="landing-text-wrap landing-wrap">
            <p className="ta-c landing-text-item"> Twisted is a web application designed to enable yarn lovers to collect, save and explore patterns.  Want to take a test drive? <br /> Use email: test@test.com password: password</p>
        </div>      
        </div>
        <button className="start-btn btn" onClick={() => { this.context.history.push('/signin') }}>Get Started</button>
      </section>
      <section className="image-landing">
      </section>
      </>
    );
  }
}


export default LandingPage;