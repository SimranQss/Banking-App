
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import LoginStore from '../../../main/stores/LoginStore'
import Button from '../../../library/common/components/button/button'
import Modal from '../../../library/common/components/modal/Modal'
import * as AccountActions from "../account/AccountActions";

class Home extends Component {
 
    constructor(){
       super();
       this.isAuthenticated = LoginStore.getUserStatus();
        this.state = {
            isShowing: false
        }
       this.showTransaction =  this.showTransaction.bind(this)
       this.onMyProfileClick = this.onMyProfileClick.bind(this);
       this.onCancel = this.onCancel.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.onChange = this.onChange.bind(this);
       this.logout = this.logout.bind(this);
    }

    onModalStart(action){
      this.setState({
          isShowing: true,
          action : action,
          amount : ''
      });
  }

  onCancel(){
      this.setState({
          isShowing: false,
          amount : ''
      });
  }

  onErrorResponse(err){
    console.log("err")
  }

  onSubmit(){
    let successCallback = (data)=>this.onApiResponse(data);
    let failureCallback = (err) => this.onErrorResponse(err);
    AccountActions.makeTransaction(this.state,successCallback,failureCallback);
    this.setState({
      isShowing: false,
      amount : ''
   });
  }

  onApiResponse(res){
    // console.log("onApiResponse")
     this.props.history.push('/account/activity')
 }

 onChange({target:{name = "", value = ""}}){
    this.setState({
      [name] : value
    });
      // console.log("state",this.state)
    }

    logout(){
      //console.log("logout")
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      LoginStore.currentUser = null;
      this.props.history.replace('/login')
    }

    showTransaction(){
      this.props.history.push('/account/activity')
    }

    onMyProfileClick(){
      //console.log("my profile",LoginStore.currentUser)
       this.props.history.push('/myprofile')
    }

    render() {
      const {isShowing,action,isCredit} = this.state;
        if(!this.isAuthenticated)
           return(<Redirect to={'/login'} />)
        else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "true")
          return <Redirect to="/admin/home"/>
        else {
          return (
         <>
         { isShowing ? 
            <div onClick={this.close} className="back-drop"></div> 
            : null }
              <main style={{background: "darkgoldenrod"}}>
                  { isShowing && <Modal
                    className="modal"
                    action = {action}
                    show={isShowing}
                    cancel={this.onCancel}
                    submit =  {this.onSubmit }>
                    {isCredit ? 
                    <span className = "color-alpha" >Deposit Amount</span>
                    : <span className = "color-alpha" >Withdrawal Amount</span>
                     }
                    <input pattern="[0-9]*" name = 'amount' 
                    placeholder="Amount" type = 'text' onChange= {this.onChange} />
                </Modal>
                }
                 <h3>Hello ! Welcome to User Panel !!</h3>
                 <div style={{display:"flex",justifyContent: "center",padding:"10px"}}>
                 <Button className="mbutton" value="Credit" 
                 onClick={this.onModalStart.bind(this,'Credit')}></Button>
                 <Button className="mbutton" value="Debit" 
                 onClick={this.onModalStart.bind(this,'Debit')}></Button>
                 <Button className="mbutton" value="Show Account Activity" 
                 onClick={this.showTransaction}>
                 </Button>
                 <Button className="mbutton" value="My Profile" onClick={this.onMyProfileClick}>
                 </Button>
                 <Button className="mbutton" value="Logout" onClick={this.logout}>
                 </Button>
                 </div>
                 </main>
                </>
        );
        }
    }
}
 
export default Home;