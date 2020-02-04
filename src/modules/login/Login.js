import React from "react"
import './Login.css'
import LoginStore from '../../main/stores/LoginStore'
import * as LoginActions from "./LoginActions";
import {Redirect} from "react-router"
 import Input from "../../library/common/components/input/input"
// import * as Validator from "../../library/common/utils/validation"


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (fields,errors,callback) => {
  let isValid = true;
  Object.values(errors).forEach(
    (val) => (val.length > 0 && (isValid = false))
  );
  Object.values(fields).forEach( 
    (val) => {
       (val.length === 0 && (isValid = false))
    }
  )
  callback(isValid);
}

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

    this.handleChange = this.handleChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.logInError = this.logInError.bind(this);
    this.isAuthenticated = LoginStore.getUserStatus();
  }

  
  handleChange(event){
    const { name, value } = event.target;
    this.setState({
      fields: {                   
          ...this.state.fields,    
          [name]: value 
      }
    });

    let errors = this.state.errors;
    switch (name) {
      case 'emailId': {
        if(value.length > 0){
          errors.emailId = 
          validEmailRegex.test(value)
           ? ''
            : 'Email is not valid!';}
        else
          errors.emailId = 'Field can\'t be empty'
          break;
      }
      case 'password': {
        if(value.length > 0){
          errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';}
        else
          errors.password = 'Field can\'t be empty'
          break;
      }
      default:
        break;
    }
    // this.setState({errors, [name]: value});
    this.setState({errors})
    // console.log("state",this.state)
  }
  
  onApiResponse(response){
    console.log("response",response)
  }

  formValidated(isValid){
    // console.log("isValid",isValid)
    if(isValid){
      LoginActions.loginUser(this.state.fields)
    }
   else{
    let {fields} = this.state; 
   for (const key in fields){
       console.log("key", key , "value", fields[key],"length",fields[key].length)
      fields[key].length === 0 && (this.setState({
          errors : {
               ...this.state.errors,
           [key] : 'Field can\'t be empty',
          }
        },()=> console.log(key,this.state.errors[key])
      ))
    }
    // Object.values(this.state.fields).forEach(
    //   (val) => {
    //      val.length === 0 && 
    //      (this.setState(
    //        {errors : {
    //          emailId : 'Field can\'t be empty',
    //          password :'Field can\'t be empty'
    //        }})
    //       )
    //   }
    // );
   }
  }
  
  onLoginClick(event){
     event.preventDefault();
     let callback = (isValid) =>  this.formValidated(isValid);
     validateForm(this.state.fields,this.state.errors,callback);
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
            <Input type='email' name='emailId' onChange={this.handleChange}  />
            {errors.emailId.length > 0 && 
              <span className='error'>{errors.emailId}</span>}
          </div>
          <div className='password'>
            <label htmlFor="password">Password</label>
            <Input type='password' name='password' onChange={this.handleChange}  />
            {errors.password.length > 0 && 
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