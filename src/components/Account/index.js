import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as firebase from 'firebase';
import { AuthUserContext } from '../Session';
const App = () => (
  <div>
    <h1>Update Account Info</h1>
    <
      ProfileForm
    />
  </div>
);
//referenced react documentation at: https://reactjs.org/docs/forms.html
class ProfileFormBase extends React.Component {
  //let database = firebase.database();
  constructor(props) {
    super(props);


    this.state = {
      avgweeklymileage: 0,
      avgpace: "",
      userGender: "",
      zipCode: 0,

      //current user fields
      curavgweeklymileage: 0,
      curavgpace: "",
      curuserGender: "",
      curzipCode: 0,

      authUser: null,
      email: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    var db = firebase.database();
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        //console.log(currentUser.uid);
        var avgweeklymileage, avgpace, userGender, zipCode;

       this.props.firebase.user(currentUser.uid).on('value', snapshot => {
        avgweeklymileage = snapshot.val().avgweeklymileage;
        avgpace = snapshot.val().avgpace;
        userGender = snapshot.val().userGender;
        zipCode = snapshot.val().zipCode;
       });

        console.log(avgweeklymileage);
        this.setState({
        authUser: currentUser.uid,
        email: currentUser.email,
        curavgweeklymileage: avgweeklymileage,
        curavgpace: avgpace,
        curuserGender: userGender,
        curzipCode: zipCode,
        });
        console.log(this.state.curavgweeklymileage);
      } else {
        console.log("User is null")
      }
    });
  };

  componentWillUnmount(){
    //this.props.firebase.user(this.state.authUser).off();
  };

  handleSubmit = event => {
    const { avgweeklymileage, avgpace, userGender, zipCode } = this.state;
    //alert('Values submitted.');
    event.preventDefault();
    this.setState({
      curavgweeklymileage: avgweeklymileage,
      curavgpace: avgpace,
      curuserGender: userGender,
      curzipCode: zipCode,
    });
  };

  handleInputChange = async function(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var text = event.target.value;

    await this.setState({
      [name]: value
    });
    var db = firebase.database();
    const { avgweeklymileage, avgpace, userGender, zipCode } = this.state;
    //db.ref("users/c6WVLHF8").update({avgpace: this.state.avgpace});
    //var currentUser = firebase.auth().currentUser;
    db.ref("users/" + this.state.authUser).update({
      avgpace: avgpace,
      avgweeklymileage: avgweeklymileage,
      userGender: userGender,
      zipCode: zipCode
    });
  }

  render() {
    return (
      <div>
        <div className="currentInfo">
          <ul>
            <p>Email: {this.state.email}</p>
            <p>Average Weekly Mileage: {this.state.curavgweeklymileage}</p>
            <p>Average Pace: {this.state.curavgpace} </p>
            <p>Gender: {this.state.curuserGender}</p>
            <p>Zip Code: {this.state.curzipCode}</p>
          </ul>
        </div>


        <div className="dataEntryBackground">

          <form onSubmit={this.handleSubmit}>
            <div className="actualData">
              <label>
                Average Weekly Mileage:
          <input className="editAccountEntry"
                  min="0"
                  name="avgweeklymileage"
                  type="number"
                  value={this.state.avgweeklymileage}
                  onChange={this.handleInputChange} />
              </label>
              <br />
              <label>
                Average pace:
          <input className="editAccountEntry"
                  name="avgpace"
                  type="text"
                  value={this.state.avgpace}
                  onChange={this.handleInputChange} />
              </label>
              <br />
              <label>
                Gender:
          <input className="editAccountEntry"
                  name="userGender"
                  type="text"
                  value={this.state.userGender}
                  onChange={this.handleInputChange} />
              </label>
              <br />
              <label>
                Zip Code:
          <input className="editAccountEntry"
                  name="zipCode"
                  type="number"
                  value={this.state.zipCode}
                  onChange={this.handleInputChange} />
              </label>
              <br />
            </div>

            <div className="centBut">
              <button type="submit">
                Update Profile
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }
}

const ProfileForm = compose(
  withRouter,
  withFirebase,
)(ProfileFormBase);


export default App;
export { ProfileForm };