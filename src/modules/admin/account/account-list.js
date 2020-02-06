import React,{Component}  from "react";
import {Redirect} from "react-router-dom";

import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore"
import Modal from '../../../library/common/components/modal/Modal'
import Table from "../../../library/common/components/table/table"

export default class AccountList extends Component{

    state ={
        userList :[],
        isShowing : false,
        selectedUser: null,
        itemsPerPage : 5
    }
    isAuthenticated = LoginStore.getUserStatus();

    tableColumns = [
      {name : 'Sr. No.',id  : ''},
       {name : 'Account No',id  : 'accountNo'},
       {name : 'Account Type', id  : 'accountType' , renderer : (item,colData) => {
        return item.accountType ? 'Saving' : 'Current'
       } }, 
       {name : 'User Name', id  : 'username' , renderer : (item,colData) => {
        return item.firstName+' ' +item.lastName
       }},
       {name : 'Account Balance', id  : 'balance'},
       {name : 'Action', id  : 'action' , renderer : (item, colData) => {
         return  <><span className="mdi mdi-eye action"    
         onClick= {this.viewUser.bind(this,item._id)}></span>
         <span className="mdi mdi-pencil action" 
         onClick= {this.updateUser.bind(this,item._id)}></span>
         <span className="mdi mdi-delete action" 
         onClick= {this.deleteUser.bind(this,item._id)}></span>
         </>
       }}
    ]

    viewUser(userId){
     this.props.history.push(`/account/details/${userId}`, { route : 'detail'})
    }

    updateUser(userId){
      this.props.history.push(`/account/update/${userId}`, { route : 'update'})
     }

     userDeleted(data,userId){
      var index = userList.findIndex(p => p._id === userId)
      const userList = [...userList]; 
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
    const {selectedUser = null} = this.state;
   let callback = (data)=> {
    this.userDeleted(data,selectedUser);
   }
   AccountActions.deleteAccount(selectedUser ,callback);
  }

    render(){
      const {userList,itemsPerPage,isShowing} = this.state
        if(!userList)
         return <span>Loading... </span>
        
    if(!this.isAuthenticated)
      return (<Redirect to={'/login'} />)
    else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "false")
      return (<Redirect to="/user/home"/>)
    else{
        return (
          <>
          { isShowing ? 
            <div onClick={this.close} className="back-drop"></div> 
          : null }
          { isShowing && <Modal
           className="modal"
           action = "Delete"
           show={isShowing}
           cancel={this.onCancel.bind(this)}
           submit =  {this.onSubmit.bind(this) }>
           Are you sure you want to delete the selected item ??
          </Modal>
          }
           <div className="container-fluid">
            <div className="card" 
            style ={{ backgroundColor : isShowing ? "transparent" : "#fff" }}>
            <div className="card-header">
             List of users
             </div>
             <div className="card-body">
               <div className="table-responsive">

              <Table dataSource={userList} 
               isPagination={true} tableColumns={this.tableColumns}
               itemsPerPage= {itemsPerPage}></Table>
             </div>
          </div>
         </div>
        </div>
      </>
        )
     }
  }

    onApiResponse(res){
       this.setState({userList : res.data.response})
    }

    componentDidMount(){
      let successCallback = (data)=>this.onApiResponse(data);
      let failureCallback = (err) => console.log(err);

       AccountActions.listAccounts(successCallback,failureCallback);
     }

}