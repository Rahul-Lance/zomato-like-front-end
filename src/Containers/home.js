import React, { Component } from 'react';
import axios from 'axios';

import '../Styles/home.css';

import Link from '../paths';

import Wallpaper from '../Components/Wallpaper';
import QuickSearches from '../Components/QuickSearches';

class home extends Component {

  state = {
    cities: [],
    mealtypes: []
  }

  componentDidMount = () => {
    axios.get(`${Link}/getLocations`).then(result => {
      this.setState({
        cities : result.data.locations
      })
    }).catch(err => {
      console.log(err);
    });
    axios.get(`${Link}/getMealTypes`).then(result => {
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
