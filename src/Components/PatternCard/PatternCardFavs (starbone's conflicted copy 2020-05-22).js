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
            // patternListArray: null,
            // userId: null,
            // patternIds: null,
            // listOfPatterns: null,
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
            this.props.firebase.db.ref(`users/${this.props.match.params.userId}/favorites`).once("value", (snapshot) => {
                let allFavorites = snapshot.val();
                let allFavoritesArray = Object.entries(allFavorites)
                this.setState({allFavoritesArray : allFavoritesArray}, () => this.handleFilterTrue());
            } )
    }
    
    //with the allFavsArray - filter those that have a value - TRUE (truefavsarray)  
        // part 1 data - filter values Keep TRUE

    handleFilterTrue = () => {
        let allFavoritesArray = this.state.allFavoritesArray
        let favoritesArrayObjects = allFavoritesArray.map(item => item[1])
        console.log(favoritesArrayObjects, "objs")
        let trueFavsArray= []

        favoritesArrayObjects.map(item => {            
        let item =  Object.values(item)
        })
        console.log(item)
            
        // }

        })

        //     let itemKeyArray = (Object.keys[0], "test2")
        //     console.log(itemKeyArray[0], "Keys")
           
        //     if (itemValueArray[0] === true){
        //         // trueFavsArray.push([itemKeyArray[keys][0]])
        //         console.log(trueFavsArray, "values of Favorites")

        //     }
        // })


        //     let patternData = item[1]
        //     console.log(patternData, "this stuff")
        // })

        // let allTrueFavs = Object.keys(allFavorites).filter(key => allFavorites[key] === true)
        // console.log("allTrueFavs", allTrueFavs);
        // this.setState({allTrueFavs: allTrueFavs });
    }
        
    



// Get all patterns and find those that match the TrueFavsArray
        // take all trues    firebase/patterns/(ID that matches the ID in the Trues array)  - push this data into a new array

//take new array with True patterns and map it to return the cards.

componentDidMount = () => {
   this.handleGetAllFavoritesOfUser();
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