import React, { Component } from 'react';
import Context from '../../Context';
// import { patterns } from '../../data';
// import { AuthUserContext } from '../Session';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { withFirebase } from '../Firebase';
// import { Link } from 'react-router-dom';
import AccountContributedNav from '../AccountContributedNav/AccountContributedNav'
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';



class PatternCardContributed extends Component {
   static contextType = Context;
   constructor(props) {
       super(props);
       this.state = {
           patternListArray: null
       }
   }

//    getContributedPatterns = () => {
//        this.props.firebase.db()
//    }
   
   setUserId = () => {
       this.setState({userId : this.props.match.params.userId}); 
   }

   componentDidMount = () => {
       this.setUserId();
   }
   
render() {
    return (
        <>
        <AccountNavigationMain />
        <AccountContributedNav userId={`${this.props.match.params.userId}`} />           
        <section className='PatternCard flex-container'>
            <div className="flex-container">
                {/* {this.handleCardRender()} */}
            </div>
        </section>
        </>
    );
}
}




export default withFirebase(PatternCardContributed);