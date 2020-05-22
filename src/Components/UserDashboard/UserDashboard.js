import React, { Component } from 'react';
import Context from '../../Context';
//import { Link } from 'react-router-dom';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import DashboardLinkFavs from '../UserDashboard/DashboardLinkFavs';
import DashboardLinkMyPatterns from './DashboardLinkMyPatterns';
import DashboardLinkAddPatterns from './DashboardLinkAddPatterns';
import DashboardLinkAccount from './DashboardLinkAccount';

// import PatternCardEdit from '../PatternCard/PatternCardEdit';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';
// import AddPattern from '../AddPattern/AddPattern';
// import * as ROLES from '../../constants/roles';
// import PatternCardFavs from '../PatternCard/PatternCardFavs';
// import PatternCardContributed from '../PatternCard/PatternCardContributed';


class UserDashboard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        }
      }
    


    setUserVal = () => {
        console.log(this.props.match.params.userId, "this")
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
                <h1>My Dashboard</h1>
               <div className="panel-wrap">
               <DashboardLinkFavs userId={this.state.userId}/>
               <DashboardLinkMyPatterns userId={this.state.userId}/>
               <DashboardLinkAddPatterns userId={this.state.userId} />
               <DashboardLinkAccount userId={this.state.userId} />
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