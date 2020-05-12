import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import TokenService from '../../services/token-service'

export default class Header extends Component {
    // handleLogoutClick = () => {
    //     TokenService.clearAuthToken()
    //     window.location.href = '/home'
    // }

    renderLogoutLink() {
        return (
            <>
                <div className='Header__logged-in bkg-color-tra'>
                    <a className='color-p pd-r-md l-font' href='/landing'>Welcome</a>
                    <Link
                        onClick={this.handleLogoutClick}
                        to='/'>
                        Logout
                </Link>
                </div>
            </>
        )
    }

    renderLoginLink() {
        return (
            <div className='bkg-color-tra Header__not-logged-in'>
                <a className='color-p bkg-color-tra pd-r-md' href='/landing'>Welcome</a>
                <Link className="pd-r-md"
                    to='/register'>
                    Register
            </Link>
                <Link className="width-100"
                    to='/login'>
                    Log in
            </Link>
            </div>
        )
    }

    render() {
        return (
            <section className='header bkg-color-lt'>
                <h1 className='app-title l-font'>
                    <a href="/home" className='header l-font app-title color-p'>Twisted</a>
                </h1>
                {/* <div className='color-te bkg-color-tra tx-a-c login-wrap'>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </div> */}
            </section>
        )
    }
}






