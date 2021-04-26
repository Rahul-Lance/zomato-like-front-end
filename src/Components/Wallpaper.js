import React, { Component } from 'react';
import CusModal from '../Components/cusModal';

import searchIcon from '../Assets/search.svg';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

class Wallpaper extends Component {

  state = {
    suggestions:[],
    text:'',
    restaurants: [],
    isSigninFormOpen: false,
    isSignupFormOpen: false
  }

  navigateToFilterPage = (item) => {
    this.props.history.push(`/filter?location=${item.location_id}`);
  }

  handleChange = (event) => {
    const city_name = event.target.selectedOptions[0].value;
    axios.get(`https://murmuring-lake-96771.herokuapp.com/api/getRestaurantsByLocation/${city_name}`)
    .then(result => {
      // console.log(result.data.restaurants);
      this.setState({
        restaurants: result.data.restaurants
      })
    }).catch(error => {
      console.log(error);
    })
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

  textChangeHandler = (event) => {
    const searchText = event.target.value;
    const {restaurants} = this.state;
    
    let suggestions = [];

    if(searchText.length>0) {
      suggestions = restaurants.filter(item => {
        return item.name.toLowerCase().includes(searchText.toLowerCase())
      })
    }

    this.setState({
      suggestions:suggestions,
      text:searchText
    })
  }

  render() {
    const {text,suggestions,isSigninFormOpen,isSignupFormOpen} = this.state;
    const {cities} = this.props;
    let userName = "";
    if(window.sessionStorage.getItem('userName')) {
      userName = JSON.parse(window.sessionStorage.getItem('userName'));
    }
    return (
      <>
        <div className="bg-box">
          <div className="container cusNavbar py-2">
          <div className="col">
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
          <div className="container gx-3 logo-title-box">
            <div className="col">
              <div className="logo-box my-3"><span>e!</span></div>
              <div className="title-box">
                <p>Find the best restaurants, cafés, and bars</p>
              </div>
              <div className="row gx-0 gx-md-3 location-search-box">
                <div className="col-12 col-md-5 location-box">
                  <select className="select mb-3" onChange={this.handleChange}>
                    <option disabled selected>Please type your location</option>
                    {
                      cities.map((item, index) => {
                        return <option key={index} value={item.city}>{item.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-12 col-md-7 search-box">
                  <div className="search-icon-box">
                    <img src={searchIcon} alt="icon"/>
                  </div>
                  <div className="search-input-box">
                    <input type="text" value={text} onChange={this.textChangeHandler} placeholder="Search for restaurants" />
                  </div>
                  {
                    suggestions.length>0?
                    <div className="suggestionsBox">
                      {
                        suggestions.map((item,index) => {
                          const imgPath = require('../'+item.image).default;
                          return <div className="suggestion" key={index} value={item} onClick={() => this.navigateToFilterPage(item)}>
                            <div className="suggestion-img-box" style={{backgroundImage:`url(${imgPath})`}}></div>
                            <div className="suggestion-text-box">{item.name}, {item.city}</div>
                          </div>
                        })
                      }
                    </div>
                    :
                    <div className="suggestionsBox">
                      {
                        text!==''?
                        <div className="suggestion">
                          <div className="suggestion-text-box">No Results Found</div>
                        </div>: null
                      }
                      
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <CusModal isSigninFormOpen={isSigninFormOpen} signinOpenHandler={this.signinOpenHandler} updateUserName={(userName) => this.setUserName(userName)}/>
        <CusModal 
          isSignupFormOpen={isSignupFormOpen} 
          signupOpenHandler={this.signupOpenHandler} 
        />
      </>
    )
  }
}

export default withRouter(Wallpaper);
