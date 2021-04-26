import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../Styles/tabs.css';

const cusTabs = ({restaurantDetails}) => {
  return (
      <Tabs>
        {
          restaurantDetails!==undefined? 
          <>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Contact</Tab>
            </TabList>
            <TabPanel>
              <h4 className="my-4">About this place</h4>
              <h5 className="mb-2">Cuisine</h5>
              <p className="mb-4">{restaurantDetails.cuisine.map(cs => cs.name + ', ')}</p>
              <h5 className="mb-2">Average Cost</h5>
              <p>₹{restaurantDetails.min_price} for two people (approx.)</p>
            </TabPanel>
            <TabPanel>
              <h5 className="mb-2 mt-4">Phone Number</h5>
              <p className="mb-4" style={{color:"red"}}>+{restaurantDetails.contact_number}</p>
              <h5 className="mb-2">{restaurantDetails.name}</h5>
              <p>{restaurantDetails.locality}, {restaurantDetails.city}</p>
            </TabPanel>
          </> : <div>Loading...</div>
        } 
      </Tabs>
  )
}

export default cusTabs;
