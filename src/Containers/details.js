import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import '../Styles/details.css';

import CusNavbar from '../Components/cusNavbar';
import CusCarousel from '../Components/cusCarousel';
import CusTabs from '../Components/cusTabs';

class details extends Component {

  state = {
    restaurantDetails: undefined
  }

  componentDidMount = () => {
    const qs = queryString.parse(this.props.location.search);
    const {restaurant_id} = qs;
    axios.get(`https://murmuring-lake-96771.herokuapp.com/api/getRestaurantsById/${restaurant_id}`).then(result => {
      this.setState({
        restaurantDetails : result.data.restaurant[0]
      })
      console.log();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {restaurantDetails} = this.state;
    let imgPath = "";
    if(restaurantDetails!==undefined) {
      imgPath = require('../'+restaurantDetails.image).default;
    }
    return (
      <>
        <CusNavbar />
        <div className="container-md gx-0 gx-md-3 py-2 py-sm-3 py-md-4 py-lg-5">
          {
            restaurantDetails !== undefined ? <CusCarousel images={restaurantDetails.thumb} /> : <div>Loading</div>
          }
        </div>
        <div className="container d-flex align-items-center mb-3">
          <div className="details-img-box me-3" style=
          {
            imgPath !== "" ? 
            {backgroundImage:`url(${imgPath})`}:
            null
          }>
          </div>
          <h1 className="text-size1">
            {restaurantDetails !== undefined ? restaurantDetails.name : null}
          </h1>
        </div>
        <div className="container">
          <CusTabs restaurantDetails={restaurantDetails}/>
        </div>
      </>
    )
  }
}

export default details;
