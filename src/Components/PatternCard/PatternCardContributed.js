import React, { Component } from 'react';
import Context from '../../Context';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import AccountContributedNav from '../AccountContributedNav/AccountContributedNav'
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';



class PatternCardContributed extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getContributedPatterns = () => {
        let patternArray = []
        this.props.firebase.db.ref(`users/${this.props.match.params.userId}`).once("value", (snapshot) => {
            let userData = snapshot.val()
            let contributedPatternIds = Object.keys(userData.contributed)
            this.setState({ contributedPatternIds: contributedPatternIds })
        })
            .then((res) => {
                let getPatternObjects = this.state.contributedPatternIds.forEach(patternId => {
                    this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                        let pattern = (snapshot.val())
                        patternArray.push(pattern)
                        this.setState({ patternArray: patternArray })
                    })
                })
            })

            .catch((error) => console.log(error))
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
                            <br /><Link to={`/${userId}/patterns/${pattern.pattern_id}`}><img src={pattern.thumbnail_image_file_URL} alt="pattern image" /></Link><br />
                        </div>
                        <div className="ta-c">
                            <button className="btn " onClick={() => { this.context.history.push(`/account/${userId}/patterns/${pattern.pattern_id}/edit`) }}>Edit Pattern</button>
                        </div>
                    </div>
                )
            })
            return getCards
        }

        else {
            return <div>No patterns have been contributed</div>
        }
    }

    componentDidMount = () => {
        this.getContributedPatterns();
    }


    render() {
        return (
            <>
                <AccountNavigationMain userId={`${this.props.match.params.userId}`} />
                {/* <AccountContributedNav userId={`${this.props.match.params.userId}`} /> */}
                <section className='PatternCard flex-container'>
                    <div className="flex-container">
                        <div>Contributed Patterns</div>
                        {this.returnPatternCards()}
                    </div>
                </section>
            </>
        );
    }
}




export default withFirebase(PatternCardContributed);