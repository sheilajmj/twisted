import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
//import {}  //try importing the authuser context 

class PatternCard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            patternListArray: null,
        
         }
    }

    userSignedIn = () => {
        if (this.props.userId){
            this.setState({userId: this.props.userId}) 
        }
    }

    handleGetPatternArray = () => {
        this.props.firebase.patterns().on("value", (snapshot) => {
            let patternListArray = Object.values(snapshot.val())
            this.setState({ patternListArray: patternListArray })
            this.setState({dataLoaded: true})
        })
    }

    handleCardRender = () => {
        if (this.state.patternListArray) {

           let patterns = this.state.patternListArray.map(patternObjects => {
              let pattern = patternObjects   

              this.handleGetContributorName = () => {
                if (this.state.contributor_name){
                  return;
                }
                this.props.firebase.db.ref('users/' + pattern.contributor_user_id + '/username').once("value", (snapshot) => {
                  let contributor_name = (snapshot.val())
                  this.setState({contributor_name: contributor_name})
                })
              }
              this.handleGetContributorName();
              let signedPath = `/${this.state.userId}/patterns/${pattern.pattern_id}`
              let unsignedPath = `/patterns/${pattern.pattern_id}`

              return (
                    <div className="flex-item">
                        <div className="mg-lrc ta-c" onClick={() => { this.context.history.push(`${this.state.userId}` ? signedPath : unsignedPath)}}>
                          <strong>  {pattern.pattern_name}</strong>
                        <br /><img src={pattern.thumbnail_image_file_URL} alt="placeholder" /><br />
                        <div className="contr-nm-wrap ta-l pad-l-md">
                        <div className="contr-nm">{this.state.contributor_name}</div>
                        </div>
                        </div>
                        <div className="dis-inl ta-r">
                        <FavoriteIcon pattern_id={pattern.pattern_id} pattern_contributor={this.state.contributor_name} userId={this.props.userId} />
                        </div>
                    </div>
                )
              })
            return patterns
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