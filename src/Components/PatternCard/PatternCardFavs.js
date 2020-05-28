import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import { Link } from 'react-router-dom';

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

            favoritesArrayObjects.forEach(objItem => {
                let objItemArray = Object.values(objItem)
                let objItemKeyArray = Object.keys(objItem)

                if (objItemArray[0] === false) {
                    return;
                }
                else {
                    trueFavsArray.push(objItemKeyArray[0])
                }
            })
            this.setState({ favPatternIds: trueFavsArray }, () => this.handleGetPatternCards(this.state.favPatternIds))
        })
    }

    handleGetPatternCards = () => {
        if (!this.state.favPatternIds) {
            return;
        }
        else {
            let length = this.state.favPatternIds.length
            let patternArray = []
            let getPatternArray = this.state.favPatternIds.forEach(patternId => {
                this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                    let pattern = (snapshot.val())
                    patternArray.push(pattern)
                })
                return;
            })
            this.setState({ patternArray: patternArray })
        }
    }


    returnPatternCards = () => {
        if (this.state.patternArray) {
            let getCards = this.state.patternArray && this.state.patternArray.map((pattern) => {
                let userId = this.props.match.params.userId
                let signedPath = `/${userId}/patterns/${pattern.pattern_id}`
                let unsignedPath = `/patterns/${pattern.pattern_id}`

                return (
                    <div key={pattern.pattern_id} className="flex-item">
                        <div className="mg-lrc ta-c">
                            <strong> Name:  {pattern.pattern_name}</strong>
                            <br /><Link to= {`/${userId}/patterns/${pattern.pattern_id}`}><img src={pattern.thumbnail_image_file_URL} alt="pattern image" /></Link><br />
                            <div className="contr-nm-wrap ta-l pad-l-md" >
                            <div className="contr-nm">{pattern.contributor_name}</div>
                        </div>
                        </div>
                        <div className="dis-inl ta-r">
                        <FavoriteIcon pattern={pattern} userId={this.props.userId} />
                    </div>
                    </div>
                )
            })
            return getCards
        }

        else {
            return <div>There are no favorites to show</div>
        }
    }



    componentDidMount = () => {
        this.handleGetAllFavoritesIds()
    }


    render() {
        return (
            <>
                <AccountNavigationMain userId={this.props.match.params.userId} />
                <section className='PatternCard flex-container'>
                    <div className="flex-container">
                        <div>Favs!</div>
                        {this.returnPatternCards()}
                    </div>
                </section>
            </>
        );
    }
}




export default withFirebase(PatternCardFavs);