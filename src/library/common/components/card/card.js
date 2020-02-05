import React from "react";

// const propTypes = {
//     header: PropTypes.string,
//     mainText: PropTypes.string,
//     icon: PropTypes.string,
//     color: PropTypes.string,
//   },
//defaultProps = {
//     header: '$1,999.50',
//     mainText: 'Income',
//     icon: 'fa fa-cogs',
//     color: 'primary',
//   };
  
export default function Card(props){
    return (
        <div className="card" style={props.style}>{props.children}</div>
    )
}

// Card.propTypes = propTypes;
// Card.defaultProps = defaultProps;