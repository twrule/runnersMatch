import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
//import undefined from 'firebase/empty-import';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    var zipCode;

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.props.firebase.user(currentUser.uid).on('value', snapshot => {
          zipCode = snapshot.val().zipCode;
         });
         console.log(zipCode);
         if(typeof zipCode == 'undefined') {
           console.log("Try again");
         } else {
         this.props.firebase.users().orderByChild("zipCode").equalTo(zipCode).on('value', snapshot => {
          const usersObject = snapshot.val();
          if(usersObject) {
          const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
          }));
          
          this.setState({
            users: usersList,
            loading: false,
          });
      } else {
        console.log("usersObject is null");
        this.setState({ users: null, loading: false });
      }
    });
  }
  } else {
    console.log("User is null");
  }
});

    /*
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
    */
}



  handleInputChange = event => {
    var text = event.target.value;
    this.setState({ query: text });
    this.setState({ loading: true });

    this.props.firebase.users().orderByChild("zipCode").equalTo(text).on('value', snapshot => {
      const usersObject = snapshot.val();
      if(usersObject) {
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    }
    else {
      this.setState({ users: null, loading: false });
    }
    });
  };

  componentWillUnmount(){

  };

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Home</h1>

        {loading && <div>Loading ...</div>}
        {/*<form className="zipCodeBox">
          <input
          className='zcb'
          placeholder="Zipcode"
          value={this.state.query}
          onChange={this.handleInputChange}
          />
        </form>
    */}
        {users ? (
          <UserList users={users} />
        ) : (
          <div>There are no matches ...</div>
        )}
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul className='userListerBackground'>
    {users.map(user => (
      <li key={user.uid} className="userLister">
        <span>
          <div><strong>Name:</strong> {user.username}</div>
        </span>
        <span>
          <div><strong>E-Mail:</strong> {user.email}</div>
        </span>
        <span>
          <div><strong>Average Weekly Miles:</strong> {user.avgweeklymileage}</div>
        </span>
        <span>
          <div><strong>Zipcode:</strong> {user.zipCode}</div>
        </span>
      </li>
      ))}
  </ul>
);

export default withFirebase(HomePage);