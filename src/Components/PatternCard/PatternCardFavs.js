import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
//import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';


class PatternCardFavs extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            patternListArray: null,
            userId: null,
            patternIds: null,
            listOfPatterns: null,
        }
    }


    
    handleGetPatterns = (data) => {
        let patternArray = []
        let patterns = data.map(pattern => {
            this.props.firebase.db.ref(`patterns/${pattern}`).on('value', (snapshot) => {
                let patternData = snapshot.val()
                patternArray.push(patternData)
            })
            this.setState({ patternListArray: patternArray }, () => {this.handleGetPatternReturn(patternArray)})
            this.setState({ dataLoaded: true })
            return patternArray;
        })
  
        return patterns
    }
    

    handleGetPatternArray = (data) => {
        let getFavsTrueFromData = Object.keys(data).filter(key => data[key] === true);
            this.setState({ patternIds: getFavsTrueFromData }, () => {this.handleGetPatterns(getFavsTrueFromData)})            
    }

    handleSetUserId = () => {
        let userId = this.props.match.params.userId
        console.log(userId, "LALA")
        this.setState({ userId: userId })
        this.setState({ stateUpdated: true },
            this.handleGetListOfPatternObjects(userId))
    }

    // get a list of all pattern ids listed with the user
    handleGetListOfPatternObjects = (userId) => {
        this.props.firebase.db.ref(`users/${userId}/favorites`).once('value', (snapshot) => {
            let listOfPatternObjects = (snapshot.val())
            this.setState({ listOfPatternObjects: listOfPatternObjects }, this.handleGetPatternArray(listOfPatternObjects)
            )
        })
    }

    handleGetPatternReturn = (patternArray) => {
            let patterns = patternArray.map((pattern) => {
                console.log("HERE?", pattern);
                return pattern;
            })
console.log(patterns, "patterns?")
        //this.handleGetContributorName(pattern.contributor_user_id);
        // return (
        //     <div className="flex-item">
        //         <div onClick={() => { this.context.history.push(`/patterns/${pattern.pattern_id}`) }}>
        //             {pattern.pattern_name}
        //             <img src={pattern.thumbnail_image_file_URL} alt="placeholder" />
        //             // <div>{this.state.contributor_name}</div>
        //         </div>
        //         <FavoriteIcon pattern_id={pattern.pattern_id} userId={this.props.match.params.userId} />
        //     </div>
        // )
        // return patterns;
    }





    handleGetContributorName = (contributorId) => {
        if (this.state.contributor_name) {
            return;
        }
        this.props.firebase.db.ref('users/' + contributorId + '/username').once("value", (snapshot) => {
            let contributor_name = (snapshot.val())
            this.setState({ contributor_name: contributor_name })
        })
    }

   


    componentDidMount = () => {
        this.handleSetUserId();
    }


    render() {

        return (
            <>
                <AccountNavigationMain />
                <section className='PatternCard flex-container'>
                    <div className="flex-container">
                        <div>Favs!</div>

                    </div>
                </section>
            </>
        );
    }
}



export default withFirebase(PatternCardFavs);