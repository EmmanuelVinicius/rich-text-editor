import React, { Component } from "react";
import { Select } from 'antd';

const { Option } = Select;

export default class HeaderStyleDropdown extends Component {
  onToggle = e => {
    this.props.onToggle(e)
  }

  render() {
    return (
      <Select
        value={this.props.active}
        onChange={this.onToggle}
        placeholder="Select a heading level..."
      >
        {this.props.headerOptions.map((heading, index) => {
          return (
            <Option key={index} value={heading.style}>
              {heading.label}
            </Option>
          )
        })}
      </Select>
    )
  }
}