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
    this.props.firebase.db.ref(`/patterns/${this.props.match.params.uid}`).once("value", (snapshot) => {
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
          <h2>{pattern.pattern_name}</h2>
          <h3>{pattern.author_name}</h3>
          <FavoriteIcon pattern_id={pattern.pattern_id} userId={this.state.userId ? this.state.userId : null} />
          <img src={pattern.image_file_URL} alt="placeholder" />
          <div>Added By:  {this.state.contributor_name}</div>
          <PatternDetail pattern = {pattern}/>
          <PatternDirections pattern = {pattern} />
          {/* <CommentPanel /> */}
        </>
      )
  }


  render() {
    return (
      <div className="pattern-panel flex-container-column">
          {this.patternDataReturn()}
      </div>
    )
  }
}
export default withFirebase(PatternPanel);