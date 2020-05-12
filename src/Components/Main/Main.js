import React, { Component } from 'react';
//import Context from '../../Context';
import PatternCard from '../PatternCard/PatternCard'

class Home extends Component {
   // static contextType = Context;

    // handleAddClick = (location) => {
    //     this.context.history.push(`/${location}/add`)
    // }


    render() {
        return (
            <section className='home'>
                <div className="container">
                  <h1> Pattern Cards will be below  </h1>
                  <PatternCard />
                </div>
            </section>
        );
    }
}


export default Home;