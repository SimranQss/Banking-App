import React from 'react';
import { Route } from 'react-router-dom'
import Footer from '../footer/footer'
import Header from '../header/header'


const WrapLayout = ({ component: Component, ...rest }) => {
  // console.log("RouteLayout");
  
  return (
    <Route {...rest} render={matchProps => (
    <div className="app">
    <Header />
    <Component {...matchProps} />
    <Footer />
    </div>
    )} />
  )
};

export default WrapLayout;