import React, { Component } from 'react';
import Context from '../../Context';
import { patterns } from '../../data';


class PatternCardContributed extends Component {
   static contextType = Context;


//*****************FILTER BY CONTRIBUTED

    cards = patterns.map(pattern => {
        return (        
        <div className="flex-item" onClick={() => { this.context.history.push(`/pattern/${pattern.id}`) }}>
            { pattern.name }
            <img src={require(`../../Assets/SVG/placeholder-img.svg`)} alt="placeholder" />
                <div>{pattern.contributor}</div>
                <div>Favorites</div>
            </div>
        )
    })
 
        

    render() {

        return (
            <section className='PatternCard flex-container'>                
                <div className="flex-container">
               {this.cards}
               </div>
            </section>
        );
    }
}


export default PatternCardContributed;