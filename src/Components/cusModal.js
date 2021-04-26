import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Styles/modal.css';

import axios from 'axios';

class cusModal extends Component {

  state = {
    FN: '',
    LN: '',
    Email: '',
    Password: '',
  }

  handleChange = (e,stateChange) => {
    this.setState({
      [stateChange]:e.target.value
    })
  }

  signupHandler = (event) => {
    event.preventDefault();
    const {FN,LN,Email,Password} = this.state;

    const req = {
      firstName:FN,
      lastName: LN,
      email: Email,
      password: Password
    }
    console.log(req);
    axios({
      method:'POST',
      url:'http://localhost:4050/api/userSignUp',
      headers: {'Content-Type':'application/json'},
      data: req
    }).then(result => {
      alert('User Signed up Succesfully. Please Login');
      this.signupCancelHandler();
    }).catch(error => {
      alert('Error Signing up');
    })
  }

  signinHandler = (event) => {
    event.preventDefault();
    const {Email,Password} = this.state;

    const req = {
      email: Email,
      password: Password
    }
    axios({
      method:'POST',
      url:'http://localhost:4050/api/userLogin',
      headers: {'Content-Type':'application/json'},
      data: req
    }).then(result => {
      this.props.updateUserName(result.data.user[0].firstName);
      this.signinCancelHandler();
    }).catch(error => {
      alert('Error Logging in');
    })
  }

  signupCancelHandler = () => {
    this.setState({
      FN: '',
      LN: '',
      Email: '',
      Password: '',
    })
    this.props.signupOpenHandler()
  }

  signinCancelHandler = () => {
    this.setState({
      Email: '',
      Password: '',
    })
    this.props.signinOpenHandler()
  }

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        boxShadow             : '0px 6px 12px darkgrey'
      }
    };
    const {isSigninFormOpen,isSignupFormOpen} = this.props;
    const {FN,LN,Email,Password} = this.state;
    return (
      <>
      <Modal isOpen={isSignupFormOpen} style={customStyles} ariaHideApp={false}>
        <h1>SignUp Form</h1>
        <form>
          <label>First Name :</label>
          <input type="text" value={FN} onChange={(e) => this.handleChange(e,'FN')} /><br />
          <label>Last Name :</label>
          <input type="text" value={LN} onChange={(e) => this.handleChange(e,'LN')} /><br />
          <label>Email :</label>
          <input type="email" value={Email} onChange={(e) => this.handleChange(e,'Email')} /><br />
          <label>Password :</label>
          <input type="password" value={Password} onChange={(e) => this.handleChange(e,'Password')} /><br />
          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary" onClick={this.signupHandler}>Sign Up</button>
            <button className="btn btn-danger" onClick={this.signupCancelHandler}>Cancel</button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isSigninFormOpen} style={customStyles} ariaHideApp={false}>
        <h1>LogIn Form</h1>
        <form>
          <label>Email :</label>
          <input type="email" value={Email} onChange={(e) => this.handleChange(e,'Email')} /><br />
          <label>Password :</label>
          <input type="password" value={Password} onChange={(e) => this.handleChange(e,'Password')} /><br />
          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary" onClick={this.signinHandler}>Log In</button>
            <button className="btn btn-danger" onClick={this.signinCancelHandler}>Cancel</button>
          </div>
        </form>
      </Modal>
      </>
    )
  }
}

export default cusModal;
