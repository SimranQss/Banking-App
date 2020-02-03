import React,{Component}  from "react";
import {Redirect} from "react-router-dom";
import * as AccountActions from "./AccountActions";
import LoginStore from "../../../main/stores/LoginStore"
import Table from "../../../library/common/components/table/table"

export default class AccountActivity extends Component{

    state ={
      accountActivity :[],
      // currentPage: 1,
      itemsPerPage: 5,
    }

    isAuthenticated  = LoginStore.getUserStatus();
    tableHeaders =  [
    'Sr. No.',
    'Transaction Id', 
    'Transaction Amount',
    'Account Balance' ]

    // onPaginationClick(event) {
    //   console.log("click")
    //   this.setState({
    //   currentPage: Number(event.target.id)
    //   });
    // }


    // onPrevClick(){
    //   this.setState((prevstate)=>{
    //     firstIndex : prevstate.startIndex - 5,
    //     lastIndex : prevstate.endIndex - 5
    // })
    // }

    // onNextClick(){
    //   this.setState((prevstate)=>{
    //     startIndex : prevstate.startIndex + 5,
    //     endIndex : prevstate.endIndex + 5
    // })
    // }

    render(){

      const { accountActivity,itemsPerPage } = this.state;
      //const { accountActivity, currentPage, itemsPerPage } = this.state;

      // Logic for displaying current accountActivity
      // const lastIndex = currentPage * itemsPerPage;
      // const firstIndex = lastIndex - itemsPerPage;
      // const currentAccountActivity = accountActivity.slice(firstIndex, lastIndex);
      // const pageNumbers = [];
      //   for (let i = 1; i <= Math.ceil(accountActivity.length / itemsPerPage); i++) {
      //     pageNumbers.push(i);
      //   }
     
      // const renderPageNumbers = pageNumbers.map(number => {
      //   return (
      //     <li
      //       key={number}
      //       id={number}
      //       onClick={this.onPaginationClick.bind(this)}>
      //       {number}
      //     </li>
      //   );
      // });

       let finalIndex = accountActivity.length-1;
       let balance = accountActivity[finalIndex] &&
                      accountActivity[finalIndex].balance

      //  let startingIndex = (currentPage - 1) * itemsPerPage +1
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

               <Table dataSource={accountActivity} tableHeaders = {this.tableHeaders} 
               isPagination={true} tableColumns={this.tableColumns}
               itemsPerPage= {itemsPerPage}></Table>

              {/* <table className="table">
                  <thead>
                  <tr>
                    <th>Sr. No. </th>
                    <th>Transaction Id</th> 
                    <th>Transaction Amount</th>
                    <th>Account Balance</th>
                  </tr>
                  </thead>
                  <tbody>
                   { currentAccountActivity && currentAccountActivity.map(
                    ({_id,amount,isCredit,balance},index) => 
                     <tr key={_id}>
                       <td>{startingIndex+index}</td>
                       <td>Chq/Ref No. : UPI-002409283844</td>
                       <td style={{"color" : isCredit ? 'blue' : 'red'}}>
                       {isCredit ? `+ ${amount}` : `- ${amount}`}</td>
                       <td>{balance}</td>
                     </tr>
                   )}  
                  </tbody>
                </table> */}
                {/* Pagination */}
                {/* <ul id="page-numbers">
                {renderPageNumbers}
               </ul> */}
                {/* Pagination */}

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