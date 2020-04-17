import React, { Component } from "react";

export default class HeaderStyleDropdown extends Component {
  onToggle = e => {
    let value = e.target.value
    this.props.onToggle(value)
  }

  render() {
    return (
      <select
        value={this.props.active}
        onChange={this.onToggle}
      >
        <option value=''>Header Levels</option>
        {this.props.headerOptions.map((heading, index) => {
          return (
            <option key={index} value={heading.style}>
              {heading.label}
            </option>
          )
        })}
      </select>
    )
  }
}