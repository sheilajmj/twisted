import React, { Component } from 'react';
import Context from '../../Context';
import { patterns } from '../../data';


class PatternCard extends Component {
   static contextType = Context;

    handleAddClick = (location) => {
        this.context.history.push(`/${location}/add`)
    }

    cards = patterns.map(pattern => {
        return (        
        <div className="flex-item" onClick={() => { this.context.history.push(`/pattern/${pattern.id}/edit`) }}>
            { pattern.name }
            <img src={require(`../../Assets/SVG/placeholder-img.svg`)} alt="placeholder" />
                <div>{pattern.contributor}</div>
                <div>Favorites</div>
                <button onClick={() => {this.context.history.push(`/pattern/${pattern.id}/edit`)}}>Edit Pattern</button>
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


export default PatternCard;