import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
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

  
// get a list of all pattern ids listed with the user
    handleGetListOfPatternObjects = () => {
   let userId = this.props.match.params.userId
   console.log(userId, "LALA")
   this.props.firebase.db.ref(`users/${userId}/favorites`).once('value', (snapshot) => {
                let listOfPatternObjects = (snapshot.val())
                console.log("list of patterns", listOfPatternObjects)
                this.setState({ listOfPatternObjects: listOfPatternObjects})
                this.handleGetPatternArray(listOfPatternObjects);
            })
        }
        
    
//********************** */

    handleGetContributorName = (contributorId) => {
        "HERE?!"
        if (this.state.contributor_name) {
            return;
        }
        this.props.firebase.db.ref('users/' + contributorId + '/username').once("value", (snapshot) => {
            let contributor_name = (snapshot.val())
            this.setState({ contributor_name: contributor_name })
        })
    }

    getPatterns = () => {
        if (this.state.patternListArray === null){
            return<div></div>
        } 
        else{
            let patterns = this.state.patternListArray.map((pattern) => {
                 console.log("HERE?", pattern)
                this.handleGetContributorName(pattern.contributor_user_id);
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
            return patterns;
    }
    }

    handleGetPatternArray = (data) => {
        let patternArray = []
        let getFavsTrueFromData = Object.keys(data).filter(key => data[key] === true);
      console.log(getFavsTrueFromData, "TRUE?")
        this.setState({ patternIds: getFavsTrueFromData })

        let patterns = getFavsTrueFromData.map(pattern => {
            this.props.firebase.db.ref(`patterns/${pattern}`).on('value', (snapshot) => {
                let patternData = snapshot.val()
                patternArray.push(patternData)
            })
            this.setState({ patternListArray: patternArray })
            this.setState({dataLoaded: true})
        })
        this.getPatterns();
        return patterns
    }

    componentDidMount = () => {
        this.handleGetListOfPatternObjects(); 

    }

    render() {
        return (
            <>
                <AccountNavigationMain />
                <section className='PatternCard flex-container'>
                    <div className="flex-container">
                        <div>Favs!</div>
                        {this.getPatterns()}
                    </div>
                </section>
            </>
        );
    }
}



export default withFirebase(PatternCardFavs);