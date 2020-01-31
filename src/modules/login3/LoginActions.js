import dispatcher from "../../library/common/Dispatcher";
import axios from 'axios';

export const LOGIN_ACTIONS = {
    LOGIN_USER: 'LoginActions.loginUser',
    LOGIN_FAILED: 'LoginActions.loginFailed'
};

const headers = {
  'Content-Type': 'application/json',
}

export function loginUser(user) { // change api to common login
    axios.post('http://192.168.1.173:4000/login',user ,
    {
      headers: headers
    })
      .then(function (res) {
      //  console.log("login user",res);
        dispatcher.dispatch({
            type: LOGIN_ACTIONS.LOGIN_USER,
            user: res.data.response,
            isAdmin:res.data.isAdmin
        })
      })
      .catch(function (error) {
        dispatcher.dispatch({
          type: LOGIN_ACTIONS.LOGIN_FAILED,
          error: error
      })
      });
}