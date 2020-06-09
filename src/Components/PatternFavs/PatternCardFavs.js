import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import { Link } from 'react-router-dom';
import PageNav from '../Navigation/PageNav';


class PatternCardFavs extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            patternArray: null
        }
    }

    handleGetAllFavoritesIds = () => {
        this.props.firebase.db.ref(`users/${this.props.match.params.userId}/favorites`).once("value", (snapshot) => {
            let allFavorites = snapshot.val();
            if (allFavorites === null) {
                this.setState({ patternArray: false });
                return;
            }
            let allFavoritesArray = Object.entries(allFavorites);
            let favoritesArrayObjects = allFavoritesArray.map(item => item[1]);
            let trueFavsArray = [];
            favoritesArrayObjects.forEach(objItem => {
                let objItemArray = Object.values(objItem);
                let objItemKeyArray = Object.keys(objItem);
                if (objItemArray[0] === false) {
                    return;
                }
                else {
                    trueFavsArray.push(objItemKeyArray[0]);
                }
            })
            this.setState({ favPatternIds: trueFavsArray });
        })
            .then((res) => {
                let patternArray = []
                this.state.favPatternIds.forEach(patternId => {
                    this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                        let pattern = (snapshot.val());
                        patternArray.push(pattern);
                        this.setState({ patternArray: patternArray });
                    })
                })
                return;
            })
            .catch((error) => console.log(error));
    }

    returnPatternCards = () => {
        if (this.state.patternArray === undefined) {
            return <div className="null-response">You have not marked any patterns as favorites, yet.</div>;
        }
        else if (this.state.patternArray) {
            let getCards = this.state.patternArray && this.state.patternArray.map((pattern) => {
                let userId = this.props.match.params.userId

                return (
                    <div key={pattern.pattern_id} className="flex-item">
                        <div className="mg-lrc ta-c">
                            <strong>{pattern.pattern_name}</strong>
                            <br /><Link to={`/${userId}/patterns/${pattern.pattern_id}`}><img className="card-img" src={pattern.thumbnail_image_file_URL} alt="pattern" /></Link><br />
                            <div className="contr-nm-wrap ta-l pad-l-md" >
                                <div className="contr-nm">{pattern.contributor_name}</div>
                                <div className="dis-inl ta-r">
                                    <FavoriteIcon pattern={pattern} userId={this.props.match.params.userId} />
                                </div>
                            </div>
                        </div>

                    </div>
                );
            });
            return getCards;
        }
    }

    componentDidMount = () => {
        this.handleGetAllFavoritesIds();
    }

    render() {
        return (
            <>
                <AccountNavigationMain userId={this.props.match.params.userId} />
                <section className='PatternCard flex-container container'>
                    <div className="ta-c color-p wd-100">
                        <PageNav userId={this.props.match.params.userId} pageHeader="Favorites" />
                    </div>
                    <div className="flex-container">
                        {this.returnPatternCards()}
                    </div>
                </section>
            </>
        );
    }
}


export default withFirebase(PatternCardFavs);