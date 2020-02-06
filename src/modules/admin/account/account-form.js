import React,{Component}  from "react";
import Input from "../../../library/common/components/input/input"
import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore";
import {Redirect} from "react-router-dom";

import Label from "../../../library/common/components/label/label"
import Col from "../../../library/common/components/col/col"
import Row from "../../../library/common/components/row/row"
import Card from "../../../library/common/components/card/card"
import Container from "../../../library/common/components/container/container";

export default class AccountForm extends Component{

    state = {
       fields : {
        "firstName" : "",
        "lastName" : "",
        "age" : '',
        "religion" : "",
        "mobileNumber" : '',
        "accountType" : 1,
        "adharCardNumber" : '',
        "panCardNo" : "",
        "emailId" : "",
        "balance" : ''
      },
      pageTitle : "",
      isReadOnly : false ,// other than detailed view
      isRequired : true,
    }
    isAuthenticated  = LoginStore.getUserStatus();

    constructor(){
      super();
      this.onSubmit = this.onSubmit.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onChange = this.onChange.bind(this);
      this.showAlert = this.showAlert.bind(this);
    }

      onSubmit(event){
        const {fields} = this.state
        event.preventDefault();
        if(fields){
          switch(this.currentRoute){
            case 'create':{
             let successCallback = (data)=>{ 
              this.showAlert(data.data.message);
              }
              let failureCallback = (err) => console.log(err)
              AccountActions.createAccount(fields, successCallback,failureCallback)
             break;
            }
            case 'update' :{
               let successCallback = (data)=>{ 
                this.showAlert(data.data.message);
                }
                let failureCallback = (err) => console.log(err)
                AccountActions.updateAccount(fields, successCallback,failureCallback)
              break;
            }
            default : {
            }
          }
        }else{
         console.log("form not filled")
       }
      }
      
      onCancel(){
        // console.log("cancel")
       this.props.history.goBack();
      }

      onChange({target:{name,value}}){
      this.setState({
        fields: {                   
            ...this.state.fields,    
            [name]: value 
        }
      })
      }

      showAlert(message){
        console.log("alert",message)
        this.props.history.goBack();
      }
  
      componentDidMount(){
        const {location:{state},match:{params:{id}}} = this.props
        if(!this.isAuthenticated)
          return (<Redirect to={'/login'} />)
        else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "false")
          return (<Redirect to="/user/home"/>)
        else{
         if(state)
          this.currentRoute = state.route;
        this.userId = id;
       switch(this.currentRoute){
         case 'create':{
          //console.log("create")
          this.setState({ 
            fields : {
            "firstName" : "",
            "lastName" : "",
            "age" : '',
            "religion" : "",
            "mobileNumber" : '',
            "accountType" : 1,
            "adharCardNumber" : '',
            "panCardNo" : "",
            "emailId" : "",
            "balance" : ''
          },
          pageTitle : "Create New",
          isReadOnly : false
          })
           break;
         }
         case 'update':{
          this.setState({
            pageTitle : "Update"
          })
          // let cb = (data)=>this.onApiResponse(data); 
          // AccountActions.viewAccount(this.userId,cb);        
          let successCallback = (data)=>this.onApiResponse(data);
          let failureCallback = (err) => console.log(err);
    
           AccountActions.viewAccount(this.userId,successCallback,failureCallback);
           break;
         }
         case 'detail':
         {
          this.setState({
            pageTitle : "Details"
          })
          this.setState({
            isReadOnly : true
          })
          // let cb = (data)=>this.onApiResponse(data); 
          // AccountActions.viewAccount(this.userId,cb);

          let successCallback = (data)=>this.onApiResponse(data);
          let failureCallback = (err) => console.log(err);
    
           AccountActions.viewAccount(this.userId,successCallback,failureCallback);
           break;
         }
         default : {

         }
       }
      }
     }


      onApiResponse(data){
        this.setState({
          fields : data.data.response
        })
        //console.log("form state",this.state)
      }
     
       componentWillUnmount() {

       }

      render(){
        const {pageTitle,isReadOnly,fields:{firstName,
              lastName,age,emailId,mobileNumber,panCardNo,adharCardNumber,religion,
              accountType,balance} } = this.state;
          return (
              <>
              <Card>
              <h3> <b>Account</b> > {pageTitle && pageTitle}</h3>
              </Card> 
  
           <form style={{border: "none"}} onSubmit={this.onSubmit}>
              <Container>
                <Card style={{padding:"25px"}}>
                  <Row>
                    <Col lg="6" md="6" sm="6">
                      <Label className="labelClass">First Name</Label>
                      <Input type="text"  name="firstName" 
                      placeholder="Enter First Name"  apivalue={firstName}
                      onChange={this.onChange} isReadOnly= {isReadOnly}
                      className="inputClass" required ></Input>
                    </Col>
                    <Col lg="6" md="6" sm="6">
                      <Label className="labelClass">Last Name</Label>
                      <Input type="text"  name="lastName" isReadOnly= {isReadOnly}
                      placeholder="Enter Last Name" apivalue={lastName} 
                      onChange={this.onChange} 
                      className="inputClass" required></Input>
                    </Col>
                  </Row>
  
                  <Row>
                    <Col lg="6" md="6" sm="6">
                      <Label className="labelClass">Age</Label>
                      <Input type="number"  name="age" isReadOnly= {isReadOnly}
                      placeholder="Enter Age"  apivalue={age}
                      onChange={this.onChange} 
                      className="inputClass" required></Input>
                    </Col>
                    <Col lg="6" md="6" sm="6">
                      <Label className="labelClass">Email Id</Label>
                      <Input type="email"  name="emailId" isReadOnly= {isReadOnly}
                      placeholder="Enter Email id"  apivalue={emailId}
                      onChange={this.onChange} 
                      className="inputClass" required></Input>
                    </Col>
                  </Row>
  
                  <Row>
                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Contact Number</Label>
                        <Input type="number"  name="mobileNumber" isReadOnly= {isReadOnly}
                      placeholder="Enter Contact Number"  apivalue={mobileNumber}
                      onChange={this.onChange} 
                      className="inputClass" required></Input>
                      </Col>
  
                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Pan Card Number</Label>
                        <Input type="text"  name="panCardNo" isReadOnly= {isReadOnly}
                         placeholder="Enter Pan Card Number"  apivalue={panCardNo}
                        onChange={this.onChange} 
                        className="inputClass" required></Input>
                      </Col>
                  </Row>
  
                  <Row>
                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Adhaar Card Number</Label>
                        <Input type="text"  name="adharCardNumber" 
                          isReadOnly= {isReadOnly}
                          placeholder="Enter Adhaar Card Number" 
                          apivalue={adharCardNumber}
                          onChange={this.onChange} 
                          className="inputClass" required></Input>
                      </Col>
                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Nationality</Label>
                        <Input type="text"  name="religion" isReadOnly= {isReadOnly}
                          placeholder="Enter Nationality"  apivalue={religion}
                          onChange={this.onChange} 
                          className="inputClass" required></Input>
                      </Col>
                  </Row>
  
                  <Row>
                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Account Type</Label>
                        <select className="selectClass" name="accountType" 
                        disabled= {isReadOnly}
                        value={accountType}  onChange={this.onChange}>
                          <option value="1">Saving</option>
                          <option value="0">Current</option>
                        </select>
                      </Col>

                      <Col lg="6" md="6" sm="6">
                        <Label className="labelClass">Opening Balance</Label>
                        <Input type="number"  name="balance" isReadOnly= {this.isReadOnly}
                          placeholder="Enter Opening Balance"  apivalue={balance}
                          onChange={this.onChange} 
                          className="inputClass" required></Input>
                      </Col>
                  </Row>

                   { !isReadOnly ? 
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Input className="submitBtn" type="submit" text="CREATE"></Input>
                        <Label className="cancelBtn" onClick={this.onCancel}>cancel</Label>
                    </div>
                    : null 
                    }
                </Card>
              </Container>
          </form>
              </>
          )
      }
   // }
  }