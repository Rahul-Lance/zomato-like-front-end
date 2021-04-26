import {Component} from 'react';
import {withRouter} from 'react-router-dom';

class QuickSearches extends Component {

  handleClick = (item) => {
    // ,name=${name}
    this.props.history.push(`/filter?mealtype=${item.meal_type}&meal=${item.name}`);
  }

  render() {
    const {mealtypes} = this.props;
    return (
      <>
        <div className="container gx-3 body mb-3">
          <div className="row body-box">
            <div className="col py-4">
              <h1 className="body-title">Quick Searches</h1>
              <h6>Discover restaurants by type of meal</h6>
            </div>
          </div>
          <div className="row tiles mb-3">
            {
              mealtypes.sort((a,b) => a.meal_type > b.meal_type ? 1 : -1).map((item,index) => {
                const imgPath = require('../'+item.image).default;
                return <div onClick={() => {this.handleClick(item)}} key={index} className="col-12 col-md-6 col-lg-4">
                          <div className="tile-box">
                            <div className="tile-img" style={{backgroundImage:`url(${imgPath})`}}></div>
                            <div className="tile-text">
                              <h4>{item.name}</h4>
                              <p>{item.content}</p>
                            </div>
                          </div>
                      </div>
              })
            } 
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(QuickSearches);
