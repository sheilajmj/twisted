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
  

   handleGetPatternArray = () => {
    // let patternArray = []
    // this.props.firebase.db.ref(`users/${this.props.match.params.user}/favorites`).on('value', (snapshot) => {
    //     let patternsNotedData = snapshot.val()
    //     let getFavsFromData = Object.keys(patternsNotedData).filter(key => patternsNotedData[key] === true);
    //     this.setState({ patternIds: getFavsFromData })

    //     getFavsFromData.map(pattern => {
    //         this.props.firebase.db.ref(`patterns/${pattern}`).on('value', (snapshot) => {
    //             let patternData = snapshot.val()
    //             patternArray.push(patternData)
    //         })
    //         this.setState({ patternListArray: patternArray })
    //     })
    // })
}

handleCardRender = () => {
    if (!this.state.patternListArray) {
        return <div></div>
    }
    else {
        let patterns = this.state.patternListArray.map(patternObjects => {
            let pattern = patternObjects
            console.log(pattern, "pattern")

            this.handleGetContributorName = () => {
                if (this.state.contributor_name) {
                    return;
                }
                this.props.firebase.db.ref('users/' + pattern.contributor_user_id + '/username').once("value", (snapshot) => {
                    let contributor_name = (snapshot.val())
                    this.setState({ contributor_name: contributor_name })
                })
            }
            this.handleGetContributorName();
            return (
                <div className="flex-item">
                    <div onClick={() => { this.context.history.push(`/patterns/${pattern.pattern_id}`) }}>
                        {pattern.pattern_name}
                        <img src={pattern.thumbnail_image_file_URL} alt="placeholder" />
                        <div>{this.state.contributor_name}</div>
                    </div>
                    <FavoriteIcon pattern_id={pattern.pattern_id} userId={this.props.match.params.userId} />
                </div>
            )
        })
        return patterns
    }
}

componentDidMount = () => {
    this.handleGetPatternArray();
}

render() {
    return (
        <>
        <AccountNavigationMain />
        <AccountContributedNav userId={`${this.props.match.params.userId}`} />           
        <section className='PatternCard flex-container'>
            <div className="flex-container">
                {this.handleCardRender()}
            </div>
        </section>
        </>
    );
}
}




export default withFirebase(PatternCardContributed);