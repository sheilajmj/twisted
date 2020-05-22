import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';


const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />) : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (
    (<>
        <div className="nav-link-wrap">
            <div className="flex-blank"></div>
            <div className="flex-blank"></div>
            <div className="nav-div">
                <ul className="align-center">
                    <li>
                        <Link to={ROUTES.Landing} className="nav-link">Landing</Link>
                    </li>
                    <li>
                        <Link to={`/${authUser.uid}/home`} className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.Account + `/${authUser.uid}`} className="nav-link">Dashboard</Link>
                    </li>
                    {!!authUser.roles[ROLES.ADMIN] && (
                        <li>
                            <Link to={ROUTES.Admin} className="nav-link">Admin</Link>
                        </li>
                    )}

                    <li>
                        <SignOutButton />
                    </li>
                </ul>
            </div>
        </div>
        <section className='header bkg-color-lt'>
            <div className='app-title-wrap l-font'>
                <img className="logo" src={require('../../Assets/SVG/logo1.svg')} alt="logo" /><img className="logo-2" src={require('../../Assets/SVG/logo-02.svg')} alt='decorative' />
               <h1 className="app-title-h"><a href={`/${authUser.uid}/home`} className='header l-font app-title color-p'>Twisted</a></h1>
            </div>
        </section>

    </>
    )
);

const NavigationNonAuth = () => (
    (<>
        <div className="nav-link-wrap">
            <div className="flex-blank"></div>
            <div className="flex-blank"></div>
            <div className="nav-div">
                <ul className="align-center nav-ul">
                    <li>
                        <Link to={ROUTES.Landing} className="nav-link">Landing</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.Home} className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.Sign_In} className="nav-link">Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
        <section className='header bkg-color-lt'>
            <div className='app-title-wrap l-font'>
                <img className="logo" src={require('../../Assets/SVG/logo1.svg')} alt="logo" /><img className="logo-2" src={require('../../Assets/SVG/logo-02.svg')} alt='decorative' />
               <h1 className="app-title-h"><a href={`/home`} className='header l-font app-title color-p'>Twisted</a></h1>
            </div>
        </section>

    </>
    )
)




export default Navigation;