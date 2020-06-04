import React, { Component } from 'react';
import Context from '../../Context';
import PatternCard from '../PatternCard/PatternCard';
import { withFirebase } from '../Firebase';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import PageNav from '../Navigation/PageNav';

class Home extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
         }
    }
  
    render() {
        return (
            <section className='home'>
                <AccountNavigationMain userId={this.props.match.params.userId} />
                <PageNav userId={this.props.match.params.userId}  pageHeader={" "}/>
                <div className="container">
                    <PatternCard userId={this.props.match.params.userId } />
                </div>
            </section>
        );
    }
}


export default withFirebase(Home);