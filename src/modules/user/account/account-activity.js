import React,{Component}  from "react";
import {Redirect} from "react-router-dom";
import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore"
import Table from "../../../library/common/components/table/table"

export default class AccountActivity extends Component{

    state ={
      accountActivity :[],
      itemsPerPage: 5,
    }

    isAuthenticated  = LoginStore.getUserStatus();
    tableColumns = [
      {name : 'Sr. No.',id  : ''},
       {name : 'Transaction Id',id  : '_id'},
       {name : 'Transaction Amount', id  : 'amount',renderer:(data, items)=>{
         return <div style={{"color" : data.isCredit ? 'blue' : 'red'}}>
         {data.isCredit ? `+ ${data['amount']}` : `- ${data.amount}`}</div> 
        }},
       {name : 'Account Balance', id  : 'balance'}
    ]

    render(){

      const { accountActivity,itemsPerPage } = this.state;
       let finalIndex = accountActivity.length-1;
       let balance = accountActivity[finalIndex] &&
                      accountActivity[finalIndex].balance
        if(!accountActivity)
         return <span>Loading... </span>
        
         if(!this.isAuthenticated)
            return (<Redirect to={'/login'} />)
         else if(this.isAuthenticated && localStorage.getItem('isAdmin') === "true")
            return (<Redirect to="/admin/home"/>)
         else{
            return (
           <div className="container-fluid">
             <h3>Account Activity</h3>
             
            <div className="card">
            <div className="card-header" >
             <p>Closing Balance (INR)</p>
             <p><b>{balance}</b></p>
             </div>
             <div className="card-body">
               <div className="table-responsive">
               <Table dataSource={accountActivity} 
               isPagination={true} tableColumns={this.tableColumns}
               itemsPerPage= {itemsPerPage}></Table>
             </div>
          </div>
         </div>
        </div>)
       }
    }

    onApiResponse(res){
       this.setState({accountActivity : res.data.response})
    }

    onErrorResponse(err){
      console.log("err")
   }

    componentDidMount(){
      let successCallback = (data)=>this.onApiResponse(data);
      let failureCallback = (err) => this.onErrorResponse(err);
      AccountActions.getTransactionHistory(successCallback,failureCallback);
     }


}