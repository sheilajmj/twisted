import React, { Component } from 'react';
import Context from '../../Context';
import PatternCard from '../PatternCard/PatternCard'
import { withFirebase } from '../Firebase'

class Home extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
         }
    }
  
    componentDidMount() {
        this.addAuthToPath = () => {
            this.props.history.push(`${this.state.authUser}/home`)
        }   
    }

    render() {
        return (
            <section className='home'>
                <div className="container">
                    <PatternCard userId={this.props.match.params.userId } />
                </div>
            </section>
        );
    }
}


export default withFirebase(Home);