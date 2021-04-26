import React, { Component } from 'react';
import axios from 'axios';

import '../Styles/home.css';

import Wallpaper from '../Components/Wallpaper';
import QuickSearches from '../Components/QuickSearches';

class home extends Component {

  state = {
    cities: [],
    mealtypes: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:4050/api/getLocations').then(result => {
      this.setState({
        cities : result.data.locations
      })
    }).catch(err => {
      console.log(err);
    });
    axios.get('http://localhost:4050/api/getMealTypes').then(result => {
      this.setState({
        mealtypes : result.data.mealTypes
      })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {cities, mealtypes} = this.state;
    return (
      <>
        <Wallpaper cities={cities} />
        <QuickSearches mealtypes={mealtypes} />
      </>
    )
  }
}

export default home;
