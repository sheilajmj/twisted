import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';

class DashboardLinkFavs extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        }
      }
      setUserVal = () => {
        console.log(this.props.userId, "this in favs")
        this.setState({userId: this.props.userId})
    }

    componentDidMount = () => {
        this.setUserVal();
    }


    render() {
        return (
            <section className='dash-fav'>
                <h2>This is an image about favorites</h2>
                <Link to={`/account/${this.props.userId}/favorites`}>Favorites</Link>
            </section>

        );
    }
}

export default DashboardLinkFavs;