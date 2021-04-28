import React, { Component } from 'react';
import '../Styles/filter.css';

import axios from 'axios';
import queryString from 'query-string';

import Link from '../paths';

import CusNavbar from '../Components/cusNavbar';
import Filter from '../Components/Filter';
import FilterResults from '../Components/FilterResults';

class filter extends Component {

  state = {
    restaurantList: [],
    allRestaurants: [],
    mealName: "",
    noOfPages: [],
    filterData: {
      mealtype:undefined,
      location:undefined,
      cuisine: [],
      hcost:undefined,
      lcost:undefined,
      sort:undefined,
      page:1
    },
  }

  clearPrevState = () => {
    this.setState({
      filterData: {
        mealtype:undefined,
        location:undefined,
        cuisine: [],
        hcost:undefined,
        lcost:undefined,
        sort:undefined,
        page:1
      },
    })
  }

  updateFilteredData = (data) => {
    let {mealtype,location} = this.state.filterData;
    if(data.location!==undefined) {
      location = data.location;
    }
    const req = {
      mealtype: mealtype,
      location: location,
      cuisine: data.cuisine,
      hcost: data.hcost,
      lcost: data.lcost,
      sort: data.sort,
      page: 1
    }
    console.log(req);
    axios({
      method: 'POST',
      url: `${Link}/getFilteredRestaurants`,
      headers: {'Content-type': 'application/json'},
      data: req
    }).then(response => {
      this.setState({
        restaurantList: response.data.restaurants,
        noOfPages: response.data.no_of_pages,
        filterData: {
          mealtype: mealtype,
          location: location,
          cuisine: data.cuisine,
          hcost: data.hcost,
          lcost: data.lcost,
          sort: data.sort,
          page: 1
        }
      })
    }).catch(error => {
      console.log(error);
    });
  }

  updatePageNo = (pgNumber) => {
    const {mealtype, location, cuisine, hcost, lcost, sort} = this.state.filterData;
    const req = {
      mealtype: mealtype,
      location: location,
      cuisine: cuisine,
      hcost: hcost,
      lcost: lcost,
      sort: sort,
      page: pgNumber
    }
    axios({
      method: 'POST',
      url: `${Link}/getFilteredRestaurants`,
      headers: {'Content-type': 'application/json'},
      data: req
    }).then(response => {
      this.setState({
        restaurantList: response.data.restaurants,
        noOfPages: response.data.no_of_pages,
        filterData: {
          mealtype: mealtype,
          location: location,
          cuisine: cuisine,
          hcost: hcost,
          lcost: lcost,
          sort: sort,
          page: pgNumber
        }
      })
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    const qs = queryString.parse(this.props.location.search);
    const {mealtype,meal,location} = qs;
    this.setState({
      mealName:meal
    })
    const {cuisine,page} = this.state.filterData;
    const req = {
      mealtype: mealtype,
      location: parseInt(location),
      cuisine: cuisine,
      page:page
    }
    // console.log(req);
    axios({
      method: 'POST',
      url: `${Link}/getFilteredRestaurants`,
      headers: {'Content-type': 'application/json'},
      data: req
    }).then(response => {
      this.setState({
        restaurantList: response.data.restaurants,
        noOfPages: response.data.no_of_pages,
        filterData: {
          mealtype:mealtype,
          location:location,
          cuisine: cuisine,
          page:page
        }
      })
    }).catch(error => {
      console.log(error);
    });

    axios.get(`${Link}/getAllRestaurants`).then(result => {
      this.setState({
        allRestaurants : result.data.restaurants,
      })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {allRestaurants,restaurantList,mealName,noOfPages,filterData} = this.state;
    return (
      <>
        <CusNavbar clearPrevState={this.clearPrevState} />
        <div className="container py-2">
          <h1 className="text-size1 py-2">{mealName?mealName:"Restaurants"} in Delhi</h1>
          <div className="filter-body-box row gx-0">
            <Filter page={filterData.page} allRestaurants={allRestaurants} updateFilteredData={(data) => this.updateFilteredData(data)} />
            <FilterResults page={filterData.page} restaurantList={restaurantList} noOfPages={noOfPages} update={(item) => this.updatePageNo(item)} />
          </div>
        </div>
      </>
    )
  }
}

export default filter;
