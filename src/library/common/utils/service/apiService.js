import axios from 'axios';

  const baseUrl = 'http://192.168.1.173:4000';

  function getData(route, successCallback,errorCallback) {
    axios.get(createCompleteRoute(route),generateHeaders())
    .then((res) => successCallback(res))
    .catch((err) => errorCallback(err));
  }

  function postData(route,body,successCallback,errorCallback) {
     axios.post(createCompleteRoute(route), body,generateHeaders())
     .then((res) => successCallback(res))
     .catch((err) => errorCallback(err));
  }
  
  function updateData(route,body,successCallback,errorCallback){
     axios.put(createCompleteRoute(route), body,generateHeaders())
     .then((res) => successCallback(res))
     .catch((err) => errorCallback(err));
  }
 
  function deleteItem(route, successCallback,errorCallback){
     axios.delete(createCompleteRoute(route),generateHeaders())
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
 
  export{
    getData,postData,updateData,deleteItem
  }

