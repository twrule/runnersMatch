import React from 'react'
import { withFirebase } from '../Firebase'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import Landing from '../Landing'

const SignOutButton = ({ firebase }) => (
  <button type='button' onClick={firebase.doSignOut} className='superbut'>Sign Out</button>
)

export default withFirebase(SignOutButton)
