
import dispatcher from "../../../library/common/Dispatcher";
import axios from 'axios';

export const ACCOUNT_ACTIONS = {
    TRANSACTION_HISTORY : 'AccountActions.transactionHistory',
    MAKE_TRANSACTION : 'AccountActions.makeTransaction',
    VIEW_PROFILE : 'AccountActions.viewProfile',
    REQUEST_FAILED: 'AccountActions.requestFailed'
};

const headers = {
  'Content-Type': 'application/json',
}

export function getTransactionHistory(cb) {
  //console.log("list acc");
  headers.access_token = localStorage.getItem('token')

  axios.get('http://192.168.1.173:4000/user/transactionhistory',
  {
    headers: headers
  })
    .then(function (res) {
      cb(res);
      //console.log("res in action",res);
      dispatcher.dispatch({
          type: ACCOUNT_ACTIONS.TRANSACTION_HISTORY,
          list: res.data.response
      })
    })
    .catch(function (error) {
      //console.log("err in action",error);
      dispatcher.dispatch({
        type: ACCOUNT_ACTIONS.REQUEST_FAILED,
        error: error
    })
    });
}

export function getAccountDetails(cb) {
  //console.log("list acc");
  headers.access_token = localStorage.getItem('token')

  axios.get('http://192.168.1.173:4000/user/userById',
  {
    headers: headers
  })
    .then(function (res) {
      cb(res);
      //console.log("res in action",res);
      dispatcher.dispatch({
          type: ACCOUNT_ACTIONS.VIEW_PROFILE,
          user: res.data.response
      })
    })
    .catch(function (error) {
      //console.log("err in action",error);
      dispatcher.dispatch({
        type: ACCOUNT_ACTIONS.REQUEST_FAILED,
        error: error
    })
    });
}

export function makeTransaction(state,cb){
  const { action,amount} = state;

  headers.access_token = localStorage.getItem('token')
  let body =
    {
      "amount" : amount,
    }
    if(action === 'Credit')
      body.isCredit = 1
    else
    body.isCredit = 0;
  axios.post('http://192.168.1.173:4000/user/transaction',body,
  {
    headers: headers
  })
    .then(function (res) {
      cb(res);
      //console.log("res in action",res);
      dispatcher.dispatch({
          type: ACCOUNT_ACTIONS.MAKE_TRANSACTION,
          list: res.data.response
      })
    })
    .catch(function (error) {
      //console.log("err in action",error);
      dispatcher.dispatch({
        type: ACCOUNT_ACTIONS.REQUEST_FAILED,
        error: error
    })
    });
}