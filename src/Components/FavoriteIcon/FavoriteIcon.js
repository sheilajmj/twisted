import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class FavoriteIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
      favUpdated: false,
    }
  }

  // sets the number of favorites in the render function
  countRender = () => {
    return (<div className="count">{this.state.count}</div>);
  }

  //this references the pattern's favorite object in the database to see if signed in user has marked the pattern as a favorite
  isFav = () => {
    this.props.firebase.db.ref(`/patterns/${this.props.pattern.pattern_id}/favorite/${this.props.userId}`).once('value', (snapshot) => {
      if(snapshot.val()){
        let fav = snapshot.val()
        this.setState({fav: fav})
      }
      else {
        let fav = false
        this.setState({fav: fav})
      }
    })
  }

  //This handles marking the pattern as a favorite or not a favorite and sets state accordingly
  handleFavClick = () => {
    if (this.props.userId) {
      let fav = this.state.fav;
      let userId = this.props.userId;
      this.setState({ fav: !fav });
      this.setState({ favUpdated: true });

      //add the username to the pattern's favorite object in the database - to indicate which users have favorited the pattern 
      this.props.firebase.db.ref(`/patterns/${this.props.pattern.pattern_id}/favorite/`).update({ [`${userId}`]: !fav })
      this.loadFavCount();

      // to the user data - add the patternId as a key with child object of the pattern id /boolean, and a name/contributor name
      this.props.firebase.db.ref(`/users/${userId}/favorites/${this.props.pattern.pattern_id}`).update({[`${this.props.pattern.pattern_id}`]: !fav})
      this.props.firebase.db.ref(`/users/${userId}/favorites/${this.props.pattern.pattern_id}`).update({name: this.props.pattern.contributor_name})
    }
    else {
      this.loginPrompt();
    }
  }

  //this gets the information from the database to determine how many users have marked the pattern as a favorite
  loadFavCount = () => {
    this.props.firebase.db.ref(`/patterns/${this.props.pattern.pattern_id}/favorite`).once('value', (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let totalFavAccounts = Object.values(data);
        let count = 0;
        let totalTrue = totalFavAccounts.forEach(val => {
          if (val === true) {
            count++
          }
        });
        this.setState({ count: count });
        return totalTrue;
      }
    })
  }

  loginPrompt = () => {
    this.setState({ loginPrompt: true });
  }

  componentDidMount = () => {
    this.loadFavCount();
    this.isFav();
  }

  render() {
    return (
      <>
        <div className="fav-wrap pad-r-md" onClick={() => { this.handleFavClick() }}>
          {this.state.fav === false ? <img className="fav-icon" src={require('../../Assets/SVG/unfav.svg')} alt="unfavorite" /> : <img className="fav-icon" src={require('../../Assets/SVG/fav.svg')} alt="favorite" />}
          {this.countRender()}
        </div>
      </>
    );
  }
}


export default withFirebase(FavoriteIcon);