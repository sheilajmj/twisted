import React, { Component } from 'react';
import Context from '../../Context';
import favoritesBadge from '../../Assets/SVG/my-favorites-badge.png';
import patternsBadge from '../../Assets/SVG/my-patterns-badge.png';
import addPatternBadge from '../../Assets/SVG/add-pattern-badge.png';
import homebutton from '../../Assets/SVG/home-button_2.png';
import accountBadge from '../../Assets/SVG/account-badge.png'

class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <>
        <section className="landing container">
          <div className="landing">
            <div className="landing-text-wrap landing-wrap">
              <p className="ta-c landing-text-item"> Twisted is a web application designed to enable yarn lovers to collect, save and explore patterns.  Want to take a test drive? <br /> Use the demo credentials:<br />email: test@test.com <br />password: password</p>
              <p className="ta-l">From the home page, you will see several icons.</p>
              <div className="icons-wrap">
                <div>
                  <div className="flex-item-md">
                    <div className="icons">
                    <button className="nav-bk" ></button>
                    <button className="nav-fw" ></button>
                    </div>
                    <p className="ic-de">These navigation arrows will act like your browser navigation arrows.</p>
                  </div>
                  <div className="flex-item-md">
                    <img className="icons" src={homebutton} alt="Home Icon" />
                    <p className="ic-de">This icon will take you back to the home view of all the patterns.</p>
                  </div>
                  <br />
                  <div className="flex-item-md">
                    <img className="icons" src={favoritesBadge} alt="Favorites Icon" />
                    <p className="ic-de">This icon will allow you to view patterns you have marked as a favorite.</p>
                  </div>
                  <br />
                  <div className="flex-item-md">
                    <img className="icons" src={patternsBadge} alt="My Contributions Icon" />
                    <p className="ic-de">Use this icon to view your pattern contributions and access the editing feature for contributed patterns.</p>
                  </div>
                  <br />
                  <div className="flex-item-md">
                    <img className="icons" src={addPatternBadge} alt="Add Pattern Icon" />
                    <p className="ic-de">This icon will take you to a page where you can add a new pattern.</p>
                  </div>
                  <br />
                  <div className="flex-item-md">
                    <img className="icons" src={accountBadge} alt="Account Icon" />
                    <p className="ic-de">The account icon will allow you to access your account information, return to the home page, or sign out </p>
                  </div>
                  <h3 className="ta-c">Enjoy!</h3>
                </div>
              </div>
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