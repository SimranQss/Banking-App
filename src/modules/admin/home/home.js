
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import LoginStore from '../../../main/stores/LoginStore'
import Button from '../../../library/common/components/button/button'

class Home extends Component {
 
    constructor(){
       super();
       this.isAuthenticated = LoginStore.getUserStatus();
    }

    createUser(){
      this.props.history.push('/account/create',{route : 'create'})
    }

    showUsers(){
      this.props.history.push('/account/list')
    }
    
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        LoginStore.currentUser = null;
        this.props.history.replace('/login')
    }
   
    render() {    
    // console.log(typeof localStorage.getItem('isAdmin'))
      if(!this.isAuthenticated)
        return(<Redirect to={'/login'} />)
      else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "false")
        return <Redirect to="/user/home"/>
      else {
        return (
            <main style={{background: "darkred"}}>
              <h3>Hello ! Welcome to Admin Panel !!</h3>
              <div style={{display:"flex",justifyContent: "center",padding:"10px"}}>
                 <Button className="mbutton" value="Create Account" 
                 onClick={this.createUser.bind(this)}></Button>
                 <Button className="mbutton" value="Show User List" 
                 onClick={this.showUsers.bind(this)}></Button>
                  <Button className="mbutton" value="Logout" 
                  onClick={this.logout.bind(this)}></Button>
              </div>
            </main>
        )}
  }
}
 
export default Home;