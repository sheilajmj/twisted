import React, { Component} from 'react';

class FavoriteIcon extends Component {

    constructor(props){
        super(props);
        this.state = {
        fav: false,
        favCount: null
        }
    }

    //get favCount from database -- if onclick this.state.fav = true - increment by 1 if false -- 1


    handleFavClick = () => {
        let fav = this.state.fav
        this.setState({fav: !fav})
        console.log(this.state.fav)
    }

    render(){
    return (
      <div className="fav-icon" onClick={() => {this.handleFavClick()}}>
        {this.state.fav === false ? <img src={require('../../Assets/SVG/unfav.svg')} alt="favorite-icon" /> : <img src={require('../../Assets/SVG/fav.svg')} alt="favorite-icon" /> }
      </div>
    )
  }
}
export default FavoriteIcon;