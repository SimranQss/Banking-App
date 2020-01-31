
import React from "react";

const Container = (props)  => {
  return (<div className="container-fluid">
            {props.children}
         </div>) //temp;check use fluid as prop
} 
export default Container;