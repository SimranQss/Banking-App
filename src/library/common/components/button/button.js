import React from "react";

export default class Button extends React.Component {

    render() {
        let {} = this.props;
        return (
            <button className={this.props.className} onClick={this.props.onClick}>{this.props.value}
            </button>
        );
    }
}