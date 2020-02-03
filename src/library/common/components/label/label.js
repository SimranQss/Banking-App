import React from "react";

export default function Label(props){
    return (
        <span className={props.className} onClick={props.onClick} >{props.children}</span>
    )
}