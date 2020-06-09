import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

class PatternCard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            patternListArray: null,
        }
    }

    userSignedIn = () => {
        if (this.props.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    handleGetPatternArray = () => {
        this.props.firebase.patterns().on("value", (snapshot) => {
            let patternListArray = Object.values(snapshot.val());
            this.setState({ patternListArray: patternListArray });
            this.setState({ dataLoaded: true });
        })
    }

    handleCardRender = () => {
        if (this.state.patternListArray) {
            let patterns = this.state.patternListArray.map(patternObjects => {
                let pattern = patternObjects;
                let signedPath = `/${this.state.userId}/patterns/${pattern.pattern_id}`;
                let unsignedPath = `/patterns/${pattern.pattern_id}`;

                return (
                    <div key={pattern.pattern_id} className="flex-item">
                        <div className="mg-lrc ta-c">
                            <strong>  {pattern.pattern_name}</strong>
                            <br /><img className="card-img clickable" src={pattern.thumbnail_image_file_URL} alt="pattern" onClick={() => { this.context.history.push(`${this.state.userId}` ? signedPath : unsignedPath) }} /><br />
                            <div className="contr-nm-wrap ta-l pad-l-md">
                                <div className="contr-nm">{pattern.contributor_name}</div>
                                <div className="dis-inl ta-r">
                                    <FavoriteIcon pattern={pattern} userId={this.props.userId} />
                                </div>
                            </div>
                        </div>

                    </div>
                );
            });
            return patterns;
        }
    }

    componentDidMount = () => {
        this.handleGetPatternArray();
        this.userSignedIn();
    }

    render() {
        return (
            <section className='PatternCard flex-container'>
                <div className="flex-container">
                    {this.handleCardRender()}
                </div>
            </section>
        );
    }
}


export default withFirebase(PatternCard);