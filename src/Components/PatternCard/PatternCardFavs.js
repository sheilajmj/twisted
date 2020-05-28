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

    handleGetAllFavoritesIds = () => {
        this.props.firebase.db.ref(`users/${this.props.match.params.userId}/favorites`).once("value", (snapshot) => {
            let allFavorites = snapshot.val();
            let allFavoritesArray = Object.entries(allFavorites)
            let favoritesArrayObjects = allFavoritesArray.map(item => item[1])
            let trueFavsArray = []

            favoritesArrayObjects.map(objItem => {
                let objItemArray = Object.values(objItem)
                let objItemKeyArray = Object.keys(objItem)

                if (objItemArray[0] === false) {
                    return;
                }
                else {
                    trueFavsArray.push(objItemKeyArray[0])
                }
            })
            this.setState({ favPatternIds: trueFavsArray })
        })
    }


    handleReturnPatternCards = () => {
        if (!this.state.favPatternIds) {
            return <div> </div>
        }
        else {
            let length = this.state.favPatternIds.length
            console.log("1")
            let patternArray = []
            let getPatternArray = this.state.favPatternIds.map(patternId => {
                this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                    let pattern = (snapshot.val())
                    console.log(pattern, "2")
                    patternArray.push(pattern)
                })
                return;
            })
console.log("3")
            if (patternArray.length === length) {
                console.log("4")
                patternArray.map((pattern) => {
                    let userId = this.props.match.params.userId
                    let signedPath = `/${this.state.userId}/patterns/${pattern.pattern_id}`
                    let unsignedPath = `/patterns/${pattern.pattern_id}`
                    console.log(pattern, "pattern in a map")
                    return (
                        <div key={pattern.pattern_id} className="flex-item">
                            <div onClick={() => { this.context.history.push(`${userId}` ? signedPath : unsignedPath) }}>
                                <strong> Name:  {pattern.pattern_name}</strong>
                                <br /><img src={pattern.thumbnail_image_file_URL} alt="placeholder" /><br />
                                <div>{pattern.contributor_name}</div>
                            </div>
                            <FavoriteIcon pattern_id={pattern.pattern_id} pattern_contributor={pattern.contributor_name} userId={this.props.userId} />
                        </div>
                    )
                })
            }
            else{
                console.log("4.5")
                return;
            }
        }
    }


        componentDidMount = () => {
            this.handleGetAllFavoritesIds()

        }


        render() {
            return (
                <>
                    <AccountNavigationMain />
                    <section className='PatternCard flex-container'>
                        <div className="flex-container">
                            <div>Favs!</div>
                            {this.handleReturnPatternCards()}
                        </div>
                    </section>
                </>
            );
        }
    }




    export default withFirebase(PatternCardFavs);