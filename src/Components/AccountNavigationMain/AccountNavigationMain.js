import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';
import favoritesBadge from '../../Assets/SVG/my-favorites-badge.png';
import patternsBadge from '../../Assets/SVG/my-patterns-badge.png';
import addPatternBadge from '../../Assets/SVG/add-pattern-badge.png';
import homebutton from '../../Assets/SVG/home-button_2.png';


class AccountNavigationMain extends Component {
    static contextType = Context;

    render() {

        return (
            <div className="dash-container align-center">
                <ul className="nav-main-wrap">
                    <li className="dash-nav-main">
                        <Link className="nav-hm nav-badge" to={`/${this.props.userId}/home`}><img className="img-bg" src={homebutton} alt="home" /></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link className="nav-badge" to={`/account/${this.props.userId}/favorites`}><img className="img-bg" src={favoritesBadge} alt="favorites link" /></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link className="nav-badge" to={`/account/${this.props.userId}/contributed`}><img className="img-bg" src={patternsBadge} alt="my patterns link" /></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link className="nav-badge" to={`/account/${this.props.userId}/add`}><img className="img-bg" src={addPatternBadge} alt="add pattern link" /></Link>
                    </li>
                </ul>
            </div>
        );
    }
}


export default AccountNavigationMain