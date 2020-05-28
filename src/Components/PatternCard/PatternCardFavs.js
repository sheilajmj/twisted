import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';


class PatternCardFavs extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    // handleGetPatterns = (data) => {
    //     let patternArray = []
    //     console.log("Here in handleGetPatterns", data)
    //     let patterns = data.map(pattern => {
    //         console.log(pattern, "pattern line 26")
    //         this.props.firebase.db.ref(`patterns/${pattern}`).on('value', (snapshot) => {
    //             let patternData = snapshot.val()
    //             patternArray.push(patternData)
    //             console.log("patternData", patternData)
    //         })
    //         this.setState({ patternListArray: patternArray }, () => { this.handleGetPatternReturn(patternArray) })
    //         this.setState({ dataLoaded: true })
    //         console.log("this is the pattern array in handle get patterns(line 22)", patternArray)
    //         return patternArray;
    //     })
    //     return patterns
    // }


    // handleGetPatternArray = (data) => {
    //     let getFavsTrueFromData = Object.keys(data).filter(key => data[key] === true);
    //     this.setState({ patternIds: getFavsTrueFromData }, () => { this.handleGetPatterns(getFavsTrueFromData) })
    // }

    // handleSetUserId = () => {
    //     let userId = this.props.match.params.userId
    //     this.setState({ userId: userId })
    //     this.setState({ stateUpdated: true },
    //         this.handleGetListOfPatternObjects(userId))
    // }

    // // get a list of all pattern ids listed with the user
    // handleGetListOfPatternObjects = (userId) => {
    //     this.props.firebase.db.ref(`users/${userId}/favorites`).once('value', (snapshot) => {
    //         let listOfPatternObjects = (snapshot.val())
    //         this.setState({ listOfPatternObjects: listOfPatternObjects }, this.handleGetPatternArray(listOfPatternObjects)
    //         )
    //     })
    // }

    // handleGetPatternReturn = (patternArray) => {
    //     console.log(patternArray, "here is pattern array")
    //     let patterns = patternArray.map((pattern) => {
    //         console.log("HERE?", pattern);
    //         return pattern;
    //     })
    //     console.log(patterns, "patterns?")
    //     //this.handleGetContributorName(pattern.contributor_user_id);
    //     // return (
    //     //     <div className="flex-item">
    //     //         <div onClick={() => { this.context.history.push(`/patterns/${pattern.pattern_id}`) }}>
    //     //             {pattern.pattern_name}
    //     //             <img src={pattern.thumbnail_image_file_URL} alt="placeholder" />
    //     //             // <div>{this.state.contributor_name}</div>
    //     //         </div>
    //     //         <FavoriteIcon pattern_id={pattern.pattern_id} userId={this.props.match.params.userId} />
    //     //     </div>
    //     // )
    //     // return patterns;
    // }





    // handleGetContributorName = (contributorId) => {
    //     if (this.state.contributor_name) {
    //         return;
    //     }
    //     this.props.firebase.db.ref('users/' + contributorId + '/username').once("value", (snapshot) => {
    //         let contributor_name = (snapshot.val())
    //         this.setState({ contributor_name: contributor_name })
    //     })
    // }




    // componentDidMount = () => {
    //     this.handleSetUserId();
    // }


    //get signed in user ID (userId) - get all patterns(patternId) listed in their favorites  (all favs array)
    // firebase users/userId/favorites/ all this data

    handleGetAllFavoritesOfUser = () => {
        return new Promise((resolve, reject) => {
        this.props.firebase.db.ref(`users/${this.props.match.params.userId}/favorites`).once("value", (snapshot) => {
            let allFavorites = snapshot.val();
            let allFavoritesArray = Object.entries(allFavorites)
            this.setState({ allFavoritesArray: allFavoritesArray });

            if (this.state.allFavoritesArray){
                resolve (allFavoritesArray)
            }
            else{
                reject(Error("there was a mishap"))
            }
        })
    })
}

    //with the allFavsArray - filter those that have a value - TRUE (truefavsarray)  
    // part 1 data - filter values Keep TRUE

    handleFilterTrue = (allFavoritesArray) => {
        return new Promise((resolve, reject) => {
            
        let favoritesArrayObjects = allFavoritesArray.map(item => item[1])
        console.log(favoritesArrayObjects, "objs")
        let trueFavsArray = []

        favoritesArrayObjects.map(objItem => {
            let objItemArray = Object.values(objItem)
            let objItemKeyArray = Object.keys(objItem)

            if (objItemArray[0] === false) {
                console.log("it was false")
            }
            else {
                trueFavsArray.push(objItemKeyArray[0])
            }
        })
        console.log("trueFavsArray", trueFavsArray)
        this.setState({ favPatternIds: trueFavsArray })
            
            if (this.state.favPatternIds){
                resolve (this.state.favPatternIds)
            }
            else {
                reject ("something went wrong")
            }
    })
    }


    // find all patterns with an ID that matched the 'true' ids from the favPatternIdsGet
    // take those pattern objects and push this data into a new array (patternArray)

    handleGetPatternArray = () => {
        return new Promise((resolve, reject) => {
        let patternArray = []
        let i = 1

        //how do i write a promise for a for loop?
        for ( i; i < patternArray.length; i++){
        let patternObjs = this.state.favPatternIds.map(patternId => {
            this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                let pattern = (snapshot.val())
                console.log(pattern,)
                patternArray.push(pattern)
                return pattern;
            })
        })
            this.setState({ patternArray: patternArray })
            return patternObjs
        }

        if (i === patternArray.length){
            resolve(this.state.patternArray)
        }
        else{
            console.log(i, "this is I")
            reject("there was a problem")
        }
     
    })
    }

    handleRenderPatterns = () => {
        if(!this.state.patternArray){
            return <div>No Patterns!</div>
        }
        else{
       console.log(typeof(this.state.patternArray))
        console.log(this.state.patternArray)
        let pattern = this.state.patternArray.map((item) => {
                let userId = this.props.match.params.userId
                let signedPath = `/${this.state.userId}/patterns/${item.pattern_id}`
                let unsignedPath = `/patterns/${item.pattern_id}`
                return (
                    <div key={item.pattern_id} className="flex-item">
                         <div onClick={() => { this.context.history.push(`${userId}` ? signedPath : unsignedPath) }}>
                             <strong> Name:  {item.pattern_name}</strong>
                             <br /><img src={item.thumbnail_image_file_URL} alt="placeholder" /><br />
                             <div>{item.contributor_name}</div>
                         </div>
                         <FavoriteIcon pattern_id={item.pattern_id} pattern_contributor={pattern.contributor_name} userId={this.props.userId} />
                     </div>
                 )
            })
            return pattern
        }
    }





    //take new array with True patterns and map it to return the cards.

    componentDidMount = () => {
        this.handleGetAllFavoritesOfUser()
            .then((allFavoritesArray) => this.handleFilterTrue(allFavoritesArray))
            .then((handleFilterTrue) =>  this.handleGetPatternArray(handleFilterTrue))
            .catch((error) => console.log(error))

    }


    render() {
        if (!this.state.patternArray){
            return <div></div>
        }
        else{
        return (
            <>
                <AccountNavigationMain />
                <section className='PatternCard flex-container'>
                    <div className="flex-container">
                        <div>Favs!</div>
                        {this.handleRenderPatterns()}
                    </div>
                </section>
            </>
        );
    }
}
}



export default withFirebase(PatternCardFavs);