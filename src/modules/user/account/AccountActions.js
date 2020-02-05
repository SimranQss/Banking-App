import * as ApiService from "../../../library/common/utils/service/apiService";

 const ACCOUNT_ACTIONS = {
    TRANSACTION_HISTORY : 'AccountActions.transactionHistory',
    MAKE_TRANSACTION : 'AccountActions.makeTransaction',
    VIEW_PROFILE : 'AccountActions.viewProfile',
    REQUEST_FAILED: 'AccountActions.requestFailed'
};


 function getTransactionHistory(successCallback,failureCallback) {
  ApiService.getData('user/transactionhistory',successCallback,failureCallback)
}

 function getAccountDetails(successCallback,failureCallback) {
  ApiService.getData('user/userById',successCallback,failureCallback)
}

 function makeTransaction(state,successCallback,failureCallback){
  const { action,amount} = state;

  let body =
    {
      "amount" : amount,
    }

  if(action === 'Credit')
    body.isCredit = 1
  else
  body.isCredit = 0;
  ApiService.postData('user/transaction',body,successCallback,failureCallback)

}

export{
  getTransactionHistory,
  getAccountDetails,
  makeTransaction,
  ACCOUNT_ACTIONS
}