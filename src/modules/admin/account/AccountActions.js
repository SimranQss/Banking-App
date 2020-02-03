
// import dispatcher from "../../../library/common/Dispatcher";
// import axios from 'axios';
import * as ApiService from "../../../library/common/utils/service/apiService";

export const ACCOUNT_ACTIONS = {
    CREATE_ACCOUNT: 'AccountActions.createAccount',
    UPDATE_ACCOUNT: 'AccountActions.updateAccount',
    DELETE_ACCOUNT: 'AccountActions.deleteAccount',
    VIEW_ACCOUNT  : 'AccountActions.viewAccount',
    LIST_ACCOUNT  : 'AccountActions.listAccount',
    REQUEST_FAILED: 'AccountActions.requestFailed'
};

// const headers = {
//   'Content-Type': 'application/json',
// }

export function createAccount(user,successCallback,failureCallback) {
  ApiService.postData('admin/createaccount',user,successCallback,failureCallback)

  // headers.access_token = localStorage.getItem('token')
  //   axios.post('http://192.168.1.173:4000/admin/createaccount',user ,
  //   {
  //     headers: headers
  //   })
  //     .then(function (res) {
  //       callback(res)
  //       //console.log("res in action" ,res);
  //       dispatcher.dispatch({
  //           type: ACCOUNT_ACTIONS.CREATE_ACCOUNT,
  //           user: res.data.response
  //       })
  //     })
  //     .catch(function (error) {
  //       dispatcher.dispatch({
  //         type: ACCOUNT_ACTIONS.REQUEST_FAILED,
  //         error: error
  //     })
  //     });
}

export function updateAccount(user,successCallback,failureCallback) {
  ApiService.postData('admin/updatedetails',user,successCallback,failureCallback)

  // headers.access_token = localStorage.getItem('token')
  //   axios.post('http://192.168.1.173:4000/admin/updatedetails',user ,
  //   {
  //     headers: headers
  //   })
  //     .then(function (res) {
  //       //console.log("res in action" ,res);
  //       callback(res)
  //       dispatcher.dispatch({
  //           type: ACCOUNT_ACTIONS.UPDATE_ACCOUNT,
  //           user: res.data.response
  //       })
  //     })
  //     .catch(function (error) {
  //       dispatcher.dispatch({
  //         type: ACCOUNT_ACTIONS.REQUEST_FAILED,
  //         error: error
  //     })
  //     });
}

export function deleteAccount(userId, successCallback,failureCallback) {
  let body = {
    _id : userId
  }
  ApiService.postData('admin/deleteuser',body,successCallback,failureCallback)

  // headers.access_token = localStorage.getItem('token')
  //   axios.post('http://192.168.1.173:4000/admin/deleteuser',body ,
  //   {
  //     headers: headers
  //   })
  //     .then(function (res) {
  //       //console.log(res);
  //       successCb(res)
  //       dispatcher.dispatch({
  //           type: ACCOUNT_ACTIONS.DELETE_ACCOUNT,
  //           user: res.data.response
  //       })
  //     })
  //     .catch(function (error) {
  //       dispatcher.dispatch({
  //         type: ACCOUNT_ACTIONS.REQUEST_FAILED,
  //         error: error
  //     })
  //     });
}

export function viewAccount(userId,successCallback,failureCallback) {
    let body = {
     "_id" : userId
    }
    ApiService.postData('admin/userById',body,successCallback,failureCallback)
    // headers.access_token = localStorage.getItem('token')
    // axios.post('http://192.168.1.173:4000/admin/userById',body,
    // {
    //   headers: headers
    // })
    //   .then(function (res) {
    //     cb(res)
    //    //console.log("view in action",res);
    //     dispatcher.dispatch({
    //         type: ACCOUNT_ACTIONS.VIEW_ACCOUNT,
    //         user: res.data.response
    //     })
    //   })
    //   .catch(function (error) {
    //     dispatcher.dispatch({
    //       type: ACCOUNT_ACTIONS.REQUEST_FAILED,
    //       error: error
    //   })
    //   });
}

export function listAccounts(successCallback,failureCallback) {

  ApiService.getData('admin/getalluser',successCallback,failureCallback)

//   axios.get('http://192.168.1.173:4000/admin/getalluser',
//   {
//     headers: headers
//   }
//  )
//     .then(function (res) {
//       cb(res);
//       //console.log("res in action",res);
//       dispatcher.dispatch({
//           type: ACCOUNT_ACTIONS.LIST_ACCOUNT,
//           list: res.data.response
//       })
//     })
//     .catch(function (error) {
//       //console.log("err in action",error);
//       dispatcher.dispatch({
//         type: ACCOUNT_ACTIONS.REQUEST_FAILED,
//         error: error
//     })
//     });
}