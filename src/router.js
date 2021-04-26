import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import home from './Containers/home';
import filter from './Containers/filter';
import details from './Containers/details';

const router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={home} />
      <Route path="/home" component={home} />
      <Route path="/filter" component={filter} />
      <Route path="/details" component={details} />
    </BrowserRouter>
  )
}

export default router;
