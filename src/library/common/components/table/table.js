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

        const { dataSource,tableColumns,itemsPerPage,isPagination } = this.props,
         currentPage = this.state.currentPage,
         lastIndex = currentPage * itemsPerPage,
         firstIndex = lastIndex - itemsPerPage,
         currentDataSource = dataSource.slice(firstIndex, lastIndex),
         pageNumbers = [],
         itemsNo = dataSource.length / itemsPerPage;
        for (let i = 1; i <= Math.ceil(itemsNo); i++) {
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

        const renderTableHeaders = tableColumns.map(
          (colData,index) => {
              return (<th key={index}>{colData.name}</th>)
          });

        const renderTableBody =  currentDataSource.map(
          (item,index1) => {
         return ( <tr key={item._id}>
            {tableColumns && tableColumns.map(
              (colData,index) => {
                let value = "";
                if(colData.renderer && typeof colData.renderer === "function"){
                  value = colData.renderer(item, colData);
                }
                else{
                  value = item[colData.id]
                }
                return !index ? <td key={index}>{startingIndex+index1}</td>
                : <td key={index}>{value}</td>
              }
              )}
          </tr>
        )});
        return (
            <>
              <table className="table">
                <thead>
                <tr>
                  {tableColumns && renderTableHeaders}
                  </tr>
                </thead>
                <tbody>
                { renderTableBody}
                </tbody>
              </table>
              {/* Pagination */}
              { isPagination && dataSource && (dataSource.length > itemsPerPage) 
                && <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
              }
              {/* Pagination */}
            </>
    )
}
}

export default Table;