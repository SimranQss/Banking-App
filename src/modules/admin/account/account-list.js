import React,{Component}  from "react";
import { Redirect } from 'react-router';

import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore"
import Modal from '../../../library/common/components/modal/Modal'

export default class AccountList extends Component{

    state ={
        userList :[],
        isShowing : false,
        selectedUser: null,
        isAuthenticated : LoginStore.getUserStatus()
    }

    viewUser(userId){
     // this.props.history.push('/account/details/'+userId, { route : 'detail',id : userId})
     this.props.history.push(`/account/details/${userId}`, { route : 'detail'})
    }

    updateUser(userId){
      this.props.history.push(`/account/update/${userId}`, { route : 'update'})
     }

     userDeleted(data,userId){
      var index = this.state.userList.findIndex(p => p._id === userId)
      const userList = [...this.state.userList]; 
      if (index !== -1) {
        userList.splice(index, 1);
        this.setState({userList: userList});
        this.setState({isShowing: false});
      }
    }

    deleteUser(userId){
      this.setState({
          isShowing: true,
          selectedUser : userId
      });
   }

   onCancel(){
      this.setState({
          isShowing: false,
          selectedUser : null
      });
   }

  onSubmit(){
   let callback = (data)=> {
    this.userDeleted(data,this.state.selectedUser);
   }
   AccountActions.deleteAccount(this.state.selectedUser ,callback);
  }

    render(){
        if(!this.state.userList)
         return <span>Loading... </span>
        
     if(this.isAuthenticated && localStorage.getItem('isAdmin') === "false")
         return <Redirect to="/user/home"/>
       else {
        return (
          <>
          { this.state.isShowing ? 
            <div onClick={this.close} className="back-drop"></div> 
          : null }
          { this.state.isShowing && <Modal
           className="modal"
           action = "Delete"
           show={this.state.isShowing}
           cancel={this.onCancel.bind(this)}
           submit =  {this.onSubmit.bind(this) }>
           Are you sure you want to delete the selected item ??
          </Modal>
          }
           <div className="container-fluid">
            <div className="card" 
            style ={{ backgroundColor : this.state.isShowing ? "transparent" : "#fff" }}>
            <div className="card-header">
             List of users
             </div>
             <div className="card-body">
               <div className="table-responsive">
              <table className="table">
                  <thead>
                  <tr>
                  {/* style={{ borderColor : this.state.isShowing ?
                     "none" : "2px solid #dee2e6"}} */}
                    <th >Account Number </th>
                    <th>Account Type </th>
                    <th>User Name </th>
                    <th>Account Balance </th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.state.userList && this.state.userList.map(
                      ({_id,accountNo,accountType,firstName,lastName,balance}) => 
                     <tr key={_id}>
                       <td>{accountNo}</td>
                       <td>{accountType ? 'Saving' : 'Current'}</td>
                       <td>{firstName+' ' +lastName}</td>
                       <td>{balance}</td>
                       <td>
                         <span className="mdi mdi-eye action"    
                         onClick= {this.viewUser.bind(this,_id)}></span>
                         <span className="mdi mdi-pencil action" 
                         onClick= {this.updateUser.bind(this,_id)}></span>
                         <span className="mdi mdi-delete action" 
                         onClick= {this.deleteUser.bind(this,_id)}></span>
                       </td>
                     </tr>
                   )}             
                  </tbody>
                </table>
             </div>
          </div>
         </div>
        </div>
      </>
        )
      }
    }

    onApiResponse(res){
      console.log("hi","api success")
       this.setState({userList : res.data.response})
    }

    componentDidMount(){
      if(!this.state.isAuthenticated)
        this.props.history.push('/login')
      else{
      let successCallback = (data)=>this.onApiResponse(data);
      let failureCallback = (err) => console.log(err);

       AccountActions.listAccounts(successCallback,failureCallback);
     }
    }

}