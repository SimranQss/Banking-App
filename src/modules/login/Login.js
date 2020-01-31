import React from "react";
import {Redirect} from "react-router";

import './Login.css'
import LoginStore from '../../main/stores/LoginStore'
import * as LoginActions from "./LoginActions";
import Input from "../../library/common/components/input/input"


export default class Login extends React.Component{
   
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logInError = this.logInError.bind(this);
    this.isAuthenticated = LoginStore.getUserStatus();
  }

  handleChange({target:{name,value}}){
    this.setState({ 
      [name]: value
    });
  }

  onLoginClick(event){
     event.preventDefault();
     LoginActions.loginUser(this.state)
  }

  componentDidMount() {
    ////console.log("component mounted" , process.env.NODE_ENV , process.env.REACT_APP_CLIENT_ID)
     LoginStore.on("loginSuccessful", this.userLoggedIn);
     LoginStore.on("loginError", this.logInError);
   }
 
   componentWillUnmount() {
     LoginStore.removeListener("loginSuccessful", this.userLoggedIn);
     LoginStore.removeListener("loginError", this.logInError);
   }
 
   userLoggedIn(){
       console.log("isAdmin",localStorage.getItem("isAdmin"))
      // console.log("isAdmin",LoginStore.isAdmin()); //check fn not working

    //  if(localStorage.getItem("isAdmin"))
    //   this.props.history.push('/admin/home')
    //  else
    //   this.props.history.push('/user/home')

    // if(!localStorage.getItem("isAdmin"))
    this.props.history.push('/user/home')
  //  else
  //   this.props.history.push('/admin/home')
   }
 
   logInError() {
     //console.log("Log in error")
   }
 
  //  componentWillMount(){
  //   //  console.log("will mount")
  //   if(this.isAuthenticated)
  //     this.props.history.replace('/admin/home')
  //  }

   render(){
    if(this.isAuthenticated && localStorage.getItem("isAdmin"))
      return <Redirect to='/admin/home'/>
    else if(this.isAuthenticated && !localStorage.getItem("isAdmin"))
      return <Redirect to='/user/home'/>

     return(
      <> 
        <div className="contents" id="login-form">    
          <div className="loginBx" data-aos="fade-up" data-aos-duration="2500">
            <div className="logorow">
              {/* <img src="../../resources/kotak2.png" alt="Kotak" title="Kotak"/> */}
            </div>  
            {/* <!--  alert start  --> */}
            {/* <div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': 
            message.type === 'success',
            'alert-danger': message.type === 'error' }">{{message.text}}</div>       */}
            {/* /<!--  alert end  --> */}
            <form  onSubmit={this.onLoginClick} autoComplete="off" >
                <div id="loginSection">
                    <div className="loginInput">
                      <label>Username</label>
                      <Input type="text" name="emailId" placeholder="Enter Email Id" 
                      autoComplete="off" required="required"
                        onChange={this.handleChange}></Input>
                    </div>
                    <div className="loginPassword">
                      <label>Password</label>
                      <Input type="password"  name="password" placeholder="********" 
                      autoComplete="off" required="required"
                        onChange={this.handleChange} ></Input>
                    </div>               
                  <div className="loginBtn">
                      <input type="submit" value="Login" id="btn" className="submitBtn"/>
                    </div>         
                </div>                   
            </form>
          </div>
        </div>
      </>  
    )
   }
}