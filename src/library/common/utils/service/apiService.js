import axios from 'axios';

  const baseUrl = 'http://192.168.1.173:4000';
  // baseUrl = 'http://localhost:4000';

  export function getData(route, successCallback,errorCallback) {
    axios.get(createCompleteRoute(route),generateHeaders())
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
  }

  export function postData(route,body,successCallback,errorCallback) {
     axios.post(this.createCompleteRoute(route), body,this.generateHeaders())
     .then((res) => successCallback(res))
     .catch((err) => errorCallback(err));
  }
  
  export function updateData(route,body,successCallback,errorCallback){
     axios.put(this.createCompleteRoute(route), body,this.generateHeaders())
     .then((res) => successCallback(res))
     .catch((err) => errorCallback(err));
  }
 
  export function deleteItem(route, successCallback,errorCallback){
     axios.delete(this.createCompleteRoute(route),this.generateHeaders())
      .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
  }
 
  function createCompleteRoute(route) {
     return `${baseUrl}/${route}`;
  }

  function generateHeaders() {
     const headers = { 
                       'Content-Type': 'application/json',
                       'access_token': localStorage.getItem('token')
                      }
     return {"headers" : headers};
  }
 

