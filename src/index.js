import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.scss';
import App from './main/route/App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'; 

 ReactDOM.render(<App />, document.getElementById('root'));

//  https://reactjs.org/tutorial/tutorial.html

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
//https://codesandbox.io/s/vVoQVk78
//https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js

//https://codeburst.io/reactjs-for-noobs-ii-flux-5355adb33dad
//https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences



// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
