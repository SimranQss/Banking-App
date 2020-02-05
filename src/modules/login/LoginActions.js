 import dispatcher from "../../library/common/Dispatcher";
 import * as ApiService from "../../library/common/utils/service/apiService";

 const LOGIN_ACTIONS = {
    LOGIN_USER: 'LoginActions.loginUser',
    LOGIN_FAILED: 'LoginActions.loginFailed'
};

 function loginUser(user) { // change api to common login
  let successCallback = (res)=>{
           dispatcher.dispatch({
            type: LOGIN_ACTIONS.LOGIN_USER,
            user: res.data.response,
            isAdmin:res.data.isAdmin
        })
  }
  let failureCallback = (error) => {
    console.log(error);
        dispatcher.dispatch({
          type: LOGIN_ACTIONS.LOGIN_FAILED,
          error: error
      })
  }
  ApiService.postData('login',user,successCallback,failureCallback)
}
export {LOGIN_ACTIONS , loginUser}