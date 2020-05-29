import React, { Component } from 'react';
import PatternDetail from '../PatternDetail/PatternDetail';
import PatternDirections from '../PatternDirections/PatternDirections';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
// import CommentPanel from '../CommentPanel/CommentPanel';
import { withFirebase } from '../Firebase';
import Context from '../../Context';


class PatternPanel extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      patternData: null
    }
  }

  handleUserId = () => {
    if (this.props.match.params.userId){
      this.setState({userId: this.props.match.params.userId})
    } 
    else {
      this.setState({userId: null})
    }
  }

  handleGetPatternData = () => {
    this.props.firebase.db.ref(`/patterns/${this.props.match.params.patternId}`).once("value", (snapshot) => {
      let patternData = (snapshot.val())
      this.setState({ patternData: patternData })
      this.setState({dataLoaded: true})
      this.handleGetContributorName();
    })
  }

  handleGetContributorName = () => {
    if (!this.state.dataLoaded){
      return;
    }
    this.props.firebase.db.ref('users/' + this.state.patternData.contributor_user_id + '/username').once("value", (snapshot) => {
      let contributor_name = (snapshot.val())
      this.setState({contributor_name: contributor_name})
    })
  }

  componentDidMount() {
    this.handleGetPatternData();
    this.handleUserId();
  }

  patternDataReturn = () => {
    if (!this.state.dataLoaded){
      return (<div></div>)
    }
    let pattern = this.state.patternData;
      return (
        <>
        <div className="add-flex-container bkg-color-wt">
          <h2>{pattern.pattern_name}</h2>
          <h3>Pattern Author: {pattern.author_name}</h3>
          <img src={pattern.image_file_URL} alt="placeholder" />
          <div className="detail-contr-nm-wrap ta-l pad-l-md" >
              <div className="contr-nm">Added By: {pattern.contributor_name}</div>
          </div>
          <div className="dis-inl ta-r">
          <FavoriteIcon pattern = {pattern} userId={this.props.match.params.userId} />
          </div>
          <PatternDetail pattern = {pattern}/>
          </div>
        </>
      )
  }


  render() {
    return (
      <div className="pattern-panel ">
          {this.patternDataReturn()}
      </div>
    )
  }
}
export default withFirebase(PatternPanel);