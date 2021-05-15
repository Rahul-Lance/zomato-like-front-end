import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import '../Styles/details.css';

import CusNavbar from '../Components/cusNavbar';
import CusCarousel from '../Components/cusCarousel';
import CusTabs from '../Components/cusTabs';

class details extends Component {
  state = {
    restaurantDetails: undefined,
  };

  componentDidMount = () => {
    const qs = queryString.parse(this.props.location.search);
    const { restaurant_id } = qs;
    axios
      .get(
        `https://murmuring-lake-96771.herokuapp.com/api/getRestaurantsById/${restaurant_id}`
      )
      .then((result) => {
        this.setState({
          restaurantDetails: result.data.restaurant[0],
        });
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  stringifyValue = (val) => {
    if (
      typeof val === 'object' &&
      Object.prototype.toString.call(val) !== '[object Date]'
    ) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  placeOrder = () => {
    const data = {
      amount: 500,
      email: 'drr8678@gmail.com',
      mobileNo: '7013373319',
    };
    this.getTokenFromBE(data)
      .then((response) => {
        console.log(response);
        const formInformation = {
          action: 'https://securegw-stage.paytm.in/order/process',
          params: response,
        };
        const form = this.buildForm(formInformation);
        document.body.appendChild(form);

        form.submit();
        form.remove();
      })
      .catch((err) => console.log(err));
  };

  getTokenFromBE = (data) => {
    return fetch('http://localhost:4050/api/payment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  buildForm = (formInformation) => {
    const { action, params } = formInformation;
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', this.stringifyValue(params[key]));
    });
    return form;
  };

  render() {
    const { restaurantDetails } = this.state;
    let imgPath = '';
    if (restaurantDetails !== undefined) {
      imgPath = require('../' + restaurantDetails.image).default;
    }
    return (
      <>
        <CusNavbar />
        <div className='container-md gx-0 gx-md-3 py-2 py-sm-3 py-md-4 py-lg-5'>
          {restaurantDetails !== undefined ? (
            <CusCarousel images={restaurantDetails.thumb} />
          ) : (
            <div>Loading</div>
          )}
        </div>
        <div className='container d-flex align-items-center mb-3'>
          <div
            className='details-img-box me-3'
            style={
              imgPath !== '' ? { backgroundImage: `url(${imgPath})` } : null
            }
          ></div>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <h1 className='text-size1' style={{ marginBottom: '0px' }}>
              {restaurantDetails !== undefined ? restaurantDetails.name : null}
            </h1>
            <button className='btn btn-danger' onClick={this.placeOrder}>
              Place your order
            </button>
          </div>
        </div>
        <div className='container'>
          <CusTabs restaurantDetails={restaurantDetails} />
        </div>
      </>
    );
  }
}

export default details;
