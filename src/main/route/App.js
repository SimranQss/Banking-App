import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import AdminHome from '../../modules/admin/home/home'
import UserHome from '../../modules/user/home/home'
// import Login from '../../modules/login/Login'
import Login from '../../modules/login/Login' //temp
import AccountList from "../../modules/admin/account/account-list"
import AccountForm from "../../modules/admin/account/account-form";
import AccountActivity from "../../modules/user/account/account-activity"
import MyProfile from "../../modules/user/account/account-profile"
import WrapLayout from "../../library/common/components/layout/WrapLayout"

// import axios from 'axios';
// // import cookie from 'cookie-machine';
// // import {hashHistory} from 'react-router';

// axios.interceptors.response.use(null, function(err) {
//   if ( err.status === 401 ) {
//     localStorage.removeItem('token')
//     console.log("remove token")
//     // hashHistory.push('/login');
//   }

//   return Promise.reject(err);
// });

export default class App extends React.Component{

  render(){
    return (
        <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route> 
              <Route path="/login" component={Login} />
              <WrapLayout path="/admin/home" component={AdminHome} />
              <WrapLayout path="/user/home" component={UserHome} />
              <WrapLayout path="/account/list" component ={AccountList}/>
              <WrapLayout path="/account/create" component ={AccountForm}/>
              <WrapLayout path="/account/details/:id" component ={AccountForm}/>
              <WrapLayout path="/account/update/:id" component ={AccountForm}/>
              <WrapLayout path="/account/activity" component={AccountActivity} />
              <WrapLayout path="/myprofile" component={MyProfile} />
              <Route render = { () => <h1> NOT FOUND</h1>} />
            </Switch>
        </Router>
   )
  }
}
