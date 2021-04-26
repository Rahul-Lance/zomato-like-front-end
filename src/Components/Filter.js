import React, { Component } from 'react';

import down from '../Assets/down.svg';

class Filter extends Component {

  state = {
    filterData: {
      location:undefined,
      cuisine: [],
      hcost:undefined,
      lcost:undefined,
      sort:undefined,
    },
    dropDown: "filter-box p-3 display1"
  }

  changeHandler = (e) => {
    let arr = [],index;
    let newfilterData = {...this.state.filterData};
    let newCuisineArr = [...this.state.filterData.cuisine];
    switch(e.target.name) {
      case "location": 
        newfilterData.location = parseInt(e.target.value);
        break;
        case "cuisine": 
          switch(e.target.value) {
            case "North Indian": 
              arr = newCuisineArr.map(item => {
                return item.name;
              });
              index = arr.indexOf(e.target.value);
              if(index === -1) {
                newCuisineArr.push({cuisine:1,name: e.target.value})
              } else {
                newCuisineArr.splice(index,1);
              }
             break;
            case "South Indian": 
              arr = newCuisineArr.map(item => {
                return item.name;
              });
              index = arr.indexOf(e.target.value);
              if(index === -1) {
                newCuisineArr.push({cuisine:2,name: e.target.value})
              } else {
                newCuisineArr.splice(index,1);
              }
             break;
            case "Chinese": 
              arr = newCuisineArr.map(item => {
                return item.name;
              });
              index = arr.indexOf(e.target.value);
              if(index === -1) {
                newCuisineArr.push({cuisine:3,name: e.target.value})
              } else {
                newCuisineArr.splice(index,1);
              }
             break;
            case "Fast Food": 
              arr = newCuisineArr.map(item => {
                return item.name;
              });
              index = arr.indexOf(e.target.value);
              if(index === -1) {
                newCuisineArr.push({cuisine:4,name: e.target.value})
              } else {
                newCuisineArr.splice(index,1);
              }
             break;
            case "Street Food": 
              arr = newCuisineArr.map(item => {
                return item.name;
              });
              index = arr.indexOf(e.target.value);
              if(index === -1) {
                newCuisineArr.push({cuisine:5,name: e.target.value})
              } else {
                newCuisineArr.splice(index,1);
              }
             break;
            default: return;
          }
          newfilterData.cuisine = newCuisineArr;
        break;
      case "cost": 
        switch(e.target.value) {
          case "500" : 
            newfilterData.lcost = 0;
            newfilterData.hcost = 500;
          break;
          case "1000" : 
            newfilterData.lcost = 500;
            newfilterData.hcost = 1000;
          break;
          case "1500" : 
            newfilterData.lcost = 1000;
            newfilterData.hcost = 1500;
          break;
          case "2000" : 
            newfilterData.lcost = 1500;
            newfilterData.hcost = 2000;
          break;
          case "2500" : 
            newfilterData.lcost = 2000;
          break;
          default: return;
        }
        break;
      case "sort": 
        newfilterData.sort = parseInt(e.target.value);
      break;
      default: return;
    }
    this.setState({
      filterData: newfilterData
    })
  }

  filterHandler = () => {
    this.props.updateFilteredData(this.state.filterData);
    this.handleDropDown();
  }

  handleDropDown = () => {
    if(this.state.dropDown === "filter-box p-3 display1") {
      this.setState({
        dropDown: "filter-box p-3 display2"
      })
    } else {
      this.setState({
        dropDown: "filter-box p-3 display1"
      })
    }  
  }
  render() {
    const {allRestaurants} = this.props;
    return (
      <div className="col-12 col-lg-3">
        <div className="filter-mobile-box py-2" onClick={this.handleDropDown}>
          <h6 className="px-3">Filters / Sort</h6>
          <div className="filter-icon-box">
            <img src={down} alt="icon" />
          </div>
        </div>
        <div className={this.state.dropDown}>
          <form>
            <h3>Filter</h3>
            <div>
            <h5 className="pt">Select Restaurant</h5>
              <select onChange={this.changeHandler} className="form-select my-2" id="location" name="location">
                <option disabled selected>Select option</option>
                {allRestaurants.map((item,index) => {
                  return <option key={index} value={item.location_id}>{item.name}</option>
                })}
              </select>
            </div>
            <div className="check-box">
              <h5 className="pt-1">Cuisine</h5>
              <div><input onChange={this.changeHandler} type="checkbox" name="cuisine" className="form-check-input" value="North Indian" /> North Indian</div>
              <div><input onChange={this.changeHandler} type="checkbox" name="cuisine" className="form-check-input" value="South Indian" /> South Indian</div>
              <div><input onChange={this.changeHandler} type="checkbox" name="cuisine" className="form-check-input" value="Chinese" /> Chinese</div>
              <div><input onChange={this.changeHandler} type="checkbox" name="cuisine" className="form-check-input" value="Fast Food" /> Fast Food</div>
              <div><input onChange={this.changeHandler} type="checkbox" name="cuisine" className="form-check-input" value="Street Food" /> Street Food</div><br />
            </div>
            <div className="check-box">
              <h5 className="pt-1">Cost For Two</h5>
              <div><input onChange={this.changeHandler} type="radio" name="cost" className="form-check-input" value="500" /> Less than ₹ 500</div>
              <div><input onChange={this.changeHandler} type="radio" name="cost" className="form-check-input" value="1000" /> ₹ 500 to ₹ 1000</div>
              <div><input onChange={this.changeHandler} type="radio" name="cost" className="form-check-input" value="1500" /> ₹ 1000 to ₹ 1500</div>
              <div><input onChange={this.changeHandler} type="radio" name="cost" className="form-check-input" value="2000" /> ₹ 1500 to ₹ 2000</div>
              <div><input onChange={this.changeHandler} type="radio" name="cost" className="form-check-input" value="2500" /> ₹ 2000+</div><br />
            </div>
            <div className="check-box">
              <h5 className="pt-1">Sort</h5>
              <div><input onChange={this.changeHandler} type="radio" name="sort" className="form-check-input" value="1" /> Price low to high</div>
              <div><input onChange={this.changeHandler} type="radio" name="sort" className="form-check-input" value="-1" /> Price high to low</div>
            </div>
            <div className="d-grid gap-2 mt-4">
              <input onClick={this.filterHandler} type="button" value="Apply" className="btn btn-outline-danger" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Filter
