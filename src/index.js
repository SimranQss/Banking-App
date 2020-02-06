import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import './styles/index.scss';
import App from './main/route/App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'; 
import axios from "axios"

axios.interceptors.request.use( request => { 
    // console.log("request",request);
    return request;
},
error => {
    // console.log("error",error);
    return Promise.reject(error)
})

axios.interceptors.response.use( response => { 
    // console.log("response",response);
    return response;
},
error => {
     console.log("Hi error",error, error.response.status);
    if(error.response.status === 403)
    console.log("Hi redirect login");
    //   this.props.history.push('/login')
    return Promise.reject(error)
})

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
