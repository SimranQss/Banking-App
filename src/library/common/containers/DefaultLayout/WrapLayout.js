import React from 'react';
import { Route } from 'react-router-dom'
import Footer from './DefaultFooter'
import Header from './DefaultHeader'


const WrapLayout = ({ component: Component, ...rest }) => {
  
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