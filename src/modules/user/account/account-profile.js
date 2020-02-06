import React from "react";
import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore";
import Input from "../../../library/common/components/input/input"
import {Redirect} from "react-router-dom";

export default class MyProfile extends React.Component{
  
  state = {
    fields : {
      "firstName" : "",
      "lastName" : "",
      "age" : '',
      "religion" : "",
      "mobileNumber" : '',
      "accountType" : '',
      "adharCardNumber" : '',
      "panCardNo" : "",
      "emailId" : "",
      "balance" : ''
    },
    isReadOnly : true ,// detailed view
    isRequired : true,
  }

  isAuthenticated = LoginStore.getUserStatus();

  onErrorResponse(err){
    console.log("err")
 }

  componentDidMount(){
      let successCallback = (data)=>this.onApiResponse(data);
      let failureCallback = (err) => this.onErrorResponse(err);

      AccountActions.getAccountDetails(successCallback,failureCallback);
  }

  onApiResponse(res){
    this.setState({fields : res.data.response})
 }

  render() {
    const {fields:{firstName,lastName,emailId,age,mobileNumber,adharCardNumber,panCardNo,
          religion,accountType,balance},isReadOnly,isRequired } = this.state;
    if(!this.isAuthenticated)
      return(<Redirect to={'/login'} />)
    else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "true")
      return <Redirect to="/admin/home"/>
      else{
    return (
        <>
        <div className="card">
        <h3> <b>My Profile</b></h3>
        </div>
     <form style={{border: "none"}} >
        <div className="container-fluid">
          <div className="card" style={{padding:"25px"}}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">First Name</span>
              <Input type="text"  name="firstName" 
                placeholder="First Name"  apivalue={firstName}
                 isReadOnly= {isReadOnly}
                className="inputClass" required ></Input>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Last Name</span>
              <Input type="text"  name="lastName" isReadOnly= {isReadOnly}
                placeholder="Last Name" apivalue={lastName} 
                className="inputClass" required></Input>
              </div>
            </div>

              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Age</span>
              <Input type="number"  name="age" isReadOnly= {isReadOnly}
                placeholder="Age"  apivalue={age}
                className="inputClass" required></Input>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Email Id</span>
              <Input type="email"  name="emailId" isReadOnly= {isReadOnly}
                placeholder="Email id"  apivalue={emailId}
                className="inputClass" required></Input>
              </div>
              </div>

              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Contact Number</span>
              <Input type="number"  name="mobileNumber" isReadOnly= {isReadOnly}
                placeholder="Contact Number"  apivalue={mobileNumber}
                className="inputClass" required></Input>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Pan Card Number</span>
              <Input type="text"  name="panCardNo" isReadOnly= {isReadOnly}
                placeholder="Pan Card Number"  apivalue={panCardNo}
                className="inputClass" required></Input>
              </div>
            </div>

              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Adhaar Card Number</span>
              <Input type="text"  name="adharCardNumber" 
                 isReadOnly= {isReadOnly}
                 placeholder="Adhaar Card Number" 
                 apivalue={adharCardNumber}
                className="inputClass" required></Input>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Nationality</span>
              <Input type="text"  name="religion" isReadOnly= {isReadOnly}
                placeholder="Nationality"  apivalue={religion}
                className="inputClass" required></Input>
              </div>
              </div>

              <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Account Type</span>
              <select className="selectClass" name="accountType" 
              disabled= {isReadOnly}
               value={accountType}  >
                 <option value="1">Saving</option>
                 <option value="0">Current</option>
              </select>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
              <span className="labelClass">Balance</span>
              <Input type="number"  name="balance" isReadOnly= {isReadOnly}
                placeholder="Balance"  apivalue={balance}
                 
                className="inputClass" required></Input>
              </div>
              </div>

             { !isReadOnly ? 
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <Input className="submitBtn" type="submit" text="CREATE"></Input>
              <span className="cancelBtn" onClick={this.onCancel}>cancel</span>
              </div>
              : null 
              }
          </div>
        </div>
    </form>
        </>
  )}
}
}