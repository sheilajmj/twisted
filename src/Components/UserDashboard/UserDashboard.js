import React, { Component } from 'react';
import Context from '../../Context';
import DashboardLinkFavs from '../UserDashboard/DashboardLinkFavs';
import DashboardLinkMyPatterns from './DashboardLinkMyPatterns';
import DashboardLinkAddPatterns from './DashboardLinkAddPatterns';
import DashboardLinkAccount from './DashboardLinkAccount';
// import Home from '../Main/Main'


class UserDashboard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        }
      }
    


    setUserVal = () => {
        this.setState({userId: this.props.match.params.userId})
    }

    componentDidMount = () => {
        this.setUserVal();
    }

    render() {
        console.log("This is state", this.state.userId)
        if (this.state.userId){
        return (
            <section className='home user-dash'>
               <div className="panel-wrap">
               <DashboardLinkFavs userId={this.state.userId} />
               <DashboardLinkMyPatterns userId={this.state.userId} />
               <DashboardLinkAddPatterns userId={this.state.userId} />
               <DashboardLinkAccount userId={this.state.userId} />
               </div>
               <div>
                   {/* <Home userId={this.state.userId} /> */}
               </div>
            </section>

        );
        }
        else{
            return <div></div>
        }
    }
}

export default UserDashboard;