import React, { Component } from 'react';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

class PatternCard extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            patternListArray: null
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
              
              return (
                    <div className="flex-item">
                        <div  onClick={() => { this.context.history.push(`/patterns/${pattern.pattern_id}`) }}>
                            {pattern.pattern_name}
                        <img src={pattern.thumbnail_image_file_URL} alt="placeholder" />
                        <div>{this.state.contributor_name}</div>
                        </div>
                        <FavoriteIcon />
                    </div>
                )
              })
            return patterns
            }
        }
    
    componentDidMount = () => {
        this.handleGetPatternArray();
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