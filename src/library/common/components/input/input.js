import React from "react";
import './input.css'

export default class Input extends React.Component {

    render() {
        return (
          <input type={this.props.type} 
          name={this.props.name}  placeholder={this.props.placeholder} 
           required={this.props.isRequired} 
           readOnly={this.props.isReadOnly}
          defaultValue={this.props.apivalue}
          onChange={this.props.onChange} 
          className={this.props.className}
          />
        );
    }
}