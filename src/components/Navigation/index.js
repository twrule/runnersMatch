import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import SignOut from '../SignOut'
import { withFirebase } from '../Firebase'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <div className='navBars'>
    <ul className='navigationCSS'>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.HOMETWO}><SignOutButton /></Link>
      </li>
    </ul>
  </div>
)

const NavigationNonAuth = () => (
  <div className='navBars'>
    <ul className='navigationCSS'>
      <li className='invisBut'>
        <Link to={ROUTES.HOMETWO}><SignOutButton /></Link>
      </li>
      <li>
        <Link to={ROUTES.HOMETWO}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
    </ul>
  </div>
)
export default Navigation
