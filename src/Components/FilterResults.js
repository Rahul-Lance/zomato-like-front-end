import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class FilterResults extends Component {

  handleClick = (item) => {
    this.props.history.push(`/details?restaurant_id=${item._id}`);
  }

  leftPagination = () => {
    if(this.props.page>this.props.noOfPages[0]) {
      this.props.update(this.props.page-1);
    }
  }

  rightPagination = () => {
    if(this.props.page<this.props.noOfPages.length) {
      this.props.update(this.props.page+1);
    }
  }

  render() {
    const {restaurantList, page, noOfPages, update} = this.props; 
    let items = [];
    if (noOfPages.length>0) {
      for (let i = 0; i < noOfPages.length; i++) {
        if(i+1 === page) {
          items.push(<div className="active" key={noOfPages[i]} onClick={() => update(noOfPages[i])}>
            {noOfPages[i]}
          </div>)
        } else {
          items.push(<div key={noOfPages[i]} onClick={() => update(noOfPages[i])}>
            {noOfPages[i]}
          </div>)
        }
      }
    }
    
    return (
      <div className="options-box col-12 col-lg-9 ps-lg-3">
        {
          restaurantList.length > 0 ? 
          restaurantList.map((item,index) => {
            const imgPath = require('../'+item.image).default;
            return <div key={index} className="option-box px-3 py-2 mb-3" onClick={() => {this.handleClick(item)}}>
            <div className="option-img-title-box">
              <div className="option-img-box m-3" style={{backgroundImage:`url(${imgPath})`}}></div>
              <div className="option-title-box p-3">
                <h2 className="text-size1">{item.name}</h2>
                <h5>{item.locality}</h5>
                <p>{item.city}</p>
              </div>
            </div>
            <hr className="hr" />
            <table className="option-table">
              <thead>
                <tr>
                  <td>CUISINES : </td>
                  <td>&nbsp;{item.cuisine.map(cs => cs.name + ', ')}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>COST FOR TWO : </td>
                  <td>&nbsp;₹ {item.min_price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          }) : <div className="option-box px-3 py-2 mb-3">
                <h1 className="text-size1 my-5" style={{marginBottom:'0px',textAlign:'center'}}>No Data Found</h1>
              </div>
        }
        
        <div className="pagination-box">
          <div onClick={this.leftPagination}>&#9666;</div>
          {items}
          <div onClick={this.rightPagination}>&#9656;</div>
        </div>
      </div>
    )
  }
}

export default withRouter(FilterResults);
