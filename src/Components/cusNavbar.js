import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import CusModal from '../Components/cusModal';

class cusNavbar extends Component {

  state = {
    isSigninFormOpen: false,
    isSignupFormOpen: false
  }

  goBacktoHomePage = () => {
    if(this.props.history.location.pathname === "/filter") {
      this.props.clearPrevState();
    }
    this.props.history.push('/home');
  }

  signinOpenHandler = () => {
    const open = this.state.isSigninFormOpen;
    this.setState({
      isSigninFormOpen: !open
    })
  }

  signupOpenHandler = () => {
    const open = this.state.isSignupFormOpen;
    this.setState({
      isSignupFormOpen: !open
    })
  }

  logoutHandler = () => {
    this.setState({});
    window.sessionStorage.removeItem('userName');
  }

  setUserName = (userName) => {
    window.sessionStorage.setItem('userName',JSON.stringify(userName));
  }

  render() {
    const {isSigninFormOpen,isSignupFormOpen} = this.state;
    let userName = "";
    if(window.sessionStorage.getItem('userName')) {
      userName = JSON.parse(window.sessionStorage.getItem('userName'));
    }
    return (
      <>
        <div className="filterNavbar">
          <div className="container d-flex justify-content-between align-items-center filterContainer py-2">
            <div className="filter-logo-box d-flex justify-content-center align-items-center" onClick={this.goBacktoHomePage}>
              e!
            </div>
            <div>
              {
                userName!==''?
                <>
                  <button className="loginButton" style={{cursor:'context-menu'}}>{userName}</button>
                  <button className="signupButton" onClick={this.logoutHandler}>Logout</button>
                </> 
                :
                <>
                  <button className="loginButton" onClick={this.signinOpenHandler}>Login</button>
                  <button className="signupButton" onClick={this.signupOpenHandler}>Create an account</button>
                </>
              }
            </div>
          </div>
        </div>
        <CusModal isSigninFormOpen={isSigninFormOpen} signinOpenHandler={this.signinOpenHandler} updateUserName={(username) => this.setUserName(username)}/>
        <CusModal 
          isSignupFormOpen={isSignupFormOpen} 
          signupOpenHandler={this.signupOpenHandler} 
        />
      </>
    )
  }
}

export default withRouter(cusNavbar);
