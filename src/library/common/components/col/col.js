import React from "react";

export default function Col(props){
    return (
        <div className = {
            " col"+(props.lg ? `-lg-${props.lg}` : '')+
            (props.md ? ` col-md-${props.md}` : '')+
            (props.sm ? ` col-sm-${props.sm}` : '')+
            (props.xs ? ` col-xs-${props.xs}` : '')
         }
         >{props.children}</div>
    )
}