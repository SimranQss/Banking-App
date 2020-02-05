import React from "react";
import {Redirect} from "react-router";

import '../../styles/Login.css';
import LoginStore from '../../main/stores/LoginStore';
import * as LoginActions from "./LoginActions";
import Input from "../../library/common/components/input/input";
import * as Validator from "../../library/common/utils/validation";

export default class Login extends React.Component{
   
  constructor(props){
    super(props)

    this.state = {
      formValid: false,
      fields :{
        emailId : '',
        password : ''
      },
      errors: {
        emailId: '',
        password: '',
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logInError = this.logInError.bind(this);
    this.isAuthenticated = LoginStore.getUserStatus();
  }

  
  onChange(event){
    const { name, value } = event.target;
    this.setState({
      fields: {                   
          ...this.state.fields,    
          [name]: value 
      }
    });

    let error = Validator.validateInput(name,value);
    this.setState({
      errors : {
        ...this.state.errors,
      [name] : error }
    })
    //  console.log("state",this.state)
  }
  
  onApiResponse(response){
    console.log("response",response)
  }

  formValidated(isValid){
    let {fields} = this.state; 
    if(isValid){
      LoginActions.loginUser(fields)
    }
   else{
    let error = {};
    let isError = false;
    for (const key in fields){
      if(!fields[key].length){
        isError = true;
        error[key] = 'Field can\'t be empty';
     }
    }
    isError && this.setState({errors: error});
   }
  }
  
  onLoginClick(event){
    const {fields,errors}  = this.state
     event.preventDefault();
     let callback = (isValid) => this.formValidated(isValid);
     Validator.validateOnSubmit(fields,errors,callback);
  }

  componentDidMount() {
    LoginStore.on("loginSuccessful", this.userLoggedIn);
    LoginStore.on("loginError", this.logInError);
  }

  componentWillUnmount() {
    LoginStore.removeListener("loginSuccessful", this.userLoggedIn);
    LoginStore.removeListener("loginError", this.logInError);
  }

  userLoggedIn(){
      if(localStorage.getItem("isAdmin") === "true")
        this.props.history.push('/admin/home')
      else
        this.props.history.push('/user/home')
  }

  logInError() {
    console.log("Log in error")
  }
 

  render(){
  const {errors} = this.state;
  if(this.isAuthenticated && localStorage.getItem('isAdmin') === "false")
    return <Redirect to="/user/home"/>
  else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "true")
    return <Redirect to="/admin/home"/>
  else{
    return (
    <div className='wrapper'>
      <div className='form-wrapper'>
      <h2>Login</h2>
        <form onSubmit={this.onLoginClick} >
          <div className='email'>
            <label htmlFor="emailId">Email</label>
            <Input type='email' name='emailId' onChange={this.onChange}  />
            {errors.emailId && 
              <span className='error'>{errors.emailId}</span>}
          </div>
          <div className='password'>
            <label htmlFor="password">Password</label>
            <Input type='password' name='password' onChange={this.onChange}  />
            {errors.password && 
              <span className='error'>{errors.password}</span>}
          </div>
          <div className='submit'>
            <button className="loginBtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
 }
 }
}