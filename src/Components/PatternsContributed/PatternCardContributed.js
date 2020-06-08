import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import PageNav from '../Navigation/PageNav';


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
            if (userData.contributed === null || userData.contributed === undefined) {
                this.setState({ patternArray: false })
                return;
            }
            else {
                let contributedPatternIds = Object.keys(userData.contributed)
                this.setState({ contributedPatternIds: contributedPatternIds })
                let getPatternObjects = contributedPatternIds.forEach(patternId => {
                    this.props.firebase.db.ref(`patterns/${patternId}`).once("value", (snapshot) => {
                        let pattern = (snapshot.val())
                        patternArray.push(pattern)
                        this.setState({ patternArray: patternArray })
                    })
                })
                return getPatternObjects;
            }
        })
    }

    returnPatternCards = () => {
        if (this.state.patternArray === false) {
            return <div className="null-response mg-md">No patterns have been contributed</div>
        }
        else if (this.state.patternArray) {
            let getCards = this.state.patternArray && this.state.patternArray.map((pattern) => {
                let userId = this.props.match.params.userId

                return (
                    <div key={pattern.pattern_id} className="flex-item">
                        <div className="mg-lrc ta-c">
                            <strong> Name:  {pattern.pattern_name}</strong>
                            <br /><Link to={`/${userId}/patterns/${pattern.pattern_id}`}><img className="card-img" src={pattern.thumbnail_image_file_URL} alt="pattern" /></Link><br />
                        </div>
                        <div className="ta-c">
                            <button className="btn " onClick={() => { this.context.history.push(`/account/${userId}/patterns/${pattern.pattern_id}/edit`) }}>Edit Pattern</button>
                        </div>
                    </div>
                )
            })
            return getCards
        }
    }

    componentDidMount = () => {
        this.getContributedPatterns();
    }


    render() {
        return (
            <>
                <AccountNavigationMain userId={`${this.props.match.params.userId}`} />
                <PageNav userId={this.props.match.params.userId} pageHeader={"Contributed Patterns"} />
                <section className='PatternCard flex-container container  container-sm'>
                    <div className="flex-container">
                        {this.returnPatternCards()}
                    </div>
                </section>
            </>
        );
    }
}




export default withFirebase(PatternCardContributed);