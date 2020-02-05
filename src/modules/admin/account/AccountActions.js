
import * as ApiService from "../../../library/common/utils/service/apiService";

 const ACCOUNT_ACTIONS = {
    CREATE_ACCOUNT: 'AccountActions.createAccount',
    UPDATE_ACCOUNT: 'AccountActions.updateAccount',
    DELETE_ACCOUNT: 'AccountActions.deleteAccount',
    VIEW_ACCOUNT  : 'AccountActions.viewAccount',
    LIST_ACCOUNT  : 'AccountActions.listAccount',
    REQUEST_FAILED: 'AccountActions.requestFailed'
};


 function createAccount(user,successCallback,failureCallback) {
  ApiService.postData('admin/createaccount',user,successCallback,failureCallback)
}

 function updateAccount(user,successCallback,failureCallback) {
  ApiService.postData('admin/updatedetails',user,successCallback,failureCallback)
 }

 function deleteAccount(userId, successCallback,failureCallback) {
  let body = {
    _id : userId
  }
  ApiService.postData('admin/deleteuser',body,successCallback,failureCallback)
}

 function viewAccount(userId,successCallback,failureCallback) {
    let body = {
     "_id" : userId
    }
    ApiService.postData('admin/userById',body,successCallback,failureCallback)
}

 function listAccounts(successCallback,failureCallback) {

  ApiService.getData('admin/getalluser',successCallback,failureCallback)
}
export { ACCOUNT_ACTIONS,createAccount,
        updateAccount,deleteAccount,viewAccount,listAccounts}