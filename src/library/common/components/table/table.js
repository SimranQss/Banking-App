import React from "react"

class Table extends React.Component {

    state ={
     currentPage : 1
    }

    onPaginationClick(event) {
        this.setState({
        currentPage: Number(event.target.id)
        });
      }

    render(){

        const { dataSource,tableHeaders,itemsPerPage,isPagination } = this.props;
        const currentPage = this.state.currentPage;

        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        const currentDataSource = dataSource.slice(firstIndex, lastIndex);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataSource.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
            key={number}
            id={number}
            onClick={this.onPaginationClick.bind(this)}>
            {number}
            </li>
        );
        });

        let startingIndex = (currentPage - 1) * itemsPerPage +1;


        return (
            <>
              <table className="table">
                <thead>
                <tr>
                    {tableHeaders && tableHeaders.map( (item,index) =>
                      <th key={index}>{item}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                { currentDataSource && currentDataSource.map(
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
              </table>
              {/* Pagination */}
              { isPagination && <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
              }
              {/* Pagination */}
            </>
    )
}
}

export default Table;