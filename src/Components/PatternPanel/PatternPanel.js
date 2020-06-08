import React, { Component } from 'react';
import PatternDetail from '../PatternDetail/PatternDetail';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { withFirebase } from '../Firebase';
import Context from '../../Context';
import PageNav from '../Navigation/PageNav';

class PatternPanel extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      patternData: null
    }
  }

  handleUserId = () => {
    if (this.props.match.params.userId) {
      this.setState({ userId: this.props.match.params.userId })
    }
    else {
      this.setState({ userId: null })
    }
  }

  handleGetPatternData = () => {
    this.props.firebase.db.ref(`/patterns/${this.props.match.params.patternId}`).once("value", (snapshot) => {
      let patternData = (snapshot.val())
      this.setState({ patternData: patternData })
      this.setState({ dataLoaded: true })
      this.handleGetContributorName();
    })
  }

  handleGetContributorName = () => {
    if (!this.state.dataLoaded) {
      return;
    }
    this.props.firebase.db.ref('users/' + this.state.patternData.contributor_user_id + '/username').once("value", (snapshot) => {
      let contributor_name = (snapshot.val())
      this.setState({ contributor_name: contributor_name })
    })
  }

  componentDidMount() {
    this.handleGetPatternData();
    this.handleUserId();
  }

  patternDataReturn = () => {
    if (!this.state.dataLoaded) {
      return (<div></div>)
    }
    let pattern = this.state.patternData;
    return (
      <>
        <div className="add-flex-container bkg-color-wt">
          <h2 className="ptn-dtl-nm">{pattern.pattern_name}</h2>
          <h3>Pattern Author: {pattern.author_name}</h3>
          <img className="img-dtl card-img2" src={pattern.image_file_URL} alt="placeholder" />
          <div className="contr-nm-wrap" >
            <div className="contr-nm ta-l">Added By: {pattern.contributor_name}</div>
            <div className="dis-inl fav-dtl-wrap ta-r">
            <FavoriteIcon pattern={pattern} userId={this.props.match.params.userId} />
          </div>
          </div>
          <PatternDetail pattern={pattern} />
        </div>
      </>
    )
  }


  render() {
    return (
      <>
        <PageNav userId={this.props.match.params.userId} pageHeader={" "} />
        <div className="pattern-panel ">
          {this.patternDataReturn()}
        </div>
      </>
    )
  }
}
export default withFirebase(PatternPanel);