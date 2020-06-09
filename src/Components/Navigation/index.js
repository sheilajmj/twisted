import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import header_md from '../../Assets/header_922.png';
import header_sm from '../../Assets/header_576.png';
import header_lg from '../../Assets/header_2560.png';
import accountIcon from '../../Assets/SVG/account-badge.png';


const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />) : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);


class NavigationAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountMenuOpen: false,
            width: window.innerWidth
        }
    }

    headerSize = () => {
        if (this.state.width < 576) {
            return <Link to={`/${this.props.authUser.uid}/home`}><img className="logo" src={header_sm} alt="logo" /></Link>;
        }
        else if (this.state.width > 576 && this.state.width < 923) {
            return <Link to={`/${this.props.authUser.uid}/home`}><img className="logo" src={header_md} alt="logo" /></Link>;
        }
        else {
            return <Link to={`/${this.props.authUser.uid}/home`}><img className="logo" src={header_lg} alt="logo" /></Link>;
        }
    };

    handleAccountClick = () => {
        let accountMenuOpen = this.state.accountMenuOpen;
        this.setState({ accountMenuOpen: !accountMenuOpen });
    }

    render() {

        return (
            <>
                <div className="nav-link-wrap">
                    <div className="flex-blank" onClick={() => this.props.history.push(`/${this.props.authUser}/home`)}></div>
                    <div className="flex-blank" onClick={() => this.props.history.push(`/${this.props.authUser}/home`)}></div>
                    <div className="nav-div">
                        <AuthUserContext.Consumer>
                            {authUser =>
                                (<div className="nav-wrap">
                                    <img className="account-icon" src={accountIcon} onClick={this.handleAccountClick} alt="account" />
                                    <div className={`acc-menu ${this.state.accountMenuOpen ? "show" : "hide"}`} onClick={this.handleAccountClick}>
                                        <div>
                                            <Link to={`/${authUser.uid}/home`} className="nav-link">Home</Link>
                                        </div>
                                            <Link to={`/account/${authUser.uid}/account`}className="nav-link">Account</Link>
                                        <div>
                                            {!!authUser.roles[ROLES.ADMIN] && (
                                                <Link to={ROUTES.Admin} className="nav-link">Admin</Link>
                                            )}
                                        </div>
                                        <div>
                                            <SignOutButton />
                                        </div>
                                    </div>
                                </div>
                                )}
                        </AuthUserContext.Consumer>
                    </div>
                </div>
                <section className='header bkg-color-lt'>
                    <div className='app-title-wrap l-font'>
                        {this.headerSize()}
                    </div>
                </section>
            </>
        );
    }
}

class NavigationNonAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountMenuOpen: false,
            width: window.innerWidth
        }
    }

    headerSize = () => {
        if (this.state.width < 576) {
            return <Link to={`/home`}><img className="logo" src={header_sm} alt="logo" /></Link>;
        }
        else if (this.state.width > 576 && this.state.width < 923) {
            return <Link to={`/home`}><img className="logo" src={header_md} alt="logo" /></Link>;
        }
        else {
            return <Link to={`/home`}><img className="logo" src={header_lg} alt="logo" /></Link>;
        }
    };

    handleAccountClick = () => {
        let accountMenuOpen = this.state.accountMenuOpen;
        this.setState({ accountMenuOpen: !accountMenuOpen });
    }

    render() {
        return (
            <>
                <div className="nav-link-wrap">
                    <div className="flex-blank"></div>
                    <div className="flex-blank"></div>
                    <div className="nav-div">
                        <ul className="align-center nav-ul">
                            <li>
                                <Link to={ROUTES.Sign_In} className="nav-link">Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <section className='header bkg-color-lt'>
                    <div className='app-title-wrap l-font'>
                        {this.headerSize()}
                    </div>
                </section>
            </>
        );
    }
}


export default Navigation;