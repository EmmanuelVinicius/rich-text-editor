import React, { Component } from "react";


export default class BlockStyleButton extends Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) className += 'RichEditor-activeButton';
    return (
      <button
        className={className}
        onClick={this.onToggle}
      >
        {this.props.label}
      </button>
    );
  };
}
