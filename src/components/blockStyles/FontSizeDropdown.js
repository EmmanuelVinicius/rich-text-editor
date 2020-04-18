import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

let dropdownValues = [];
for (let i = 10; i <= 100; i += 10) {
  dropdownValues.push(i);
}

export default class FontSizeDropdown extends Component {
  
  onToggle = e => {
    console.log('event', e)
    this.props.onToggle(e);
  }

  render() {
    return (
      <Select
        value={this.props.active}
        onChange={this.onToggle}
        placeholder="Select a size"
      >{dropdownValues.map((value, i) => (
        <Option
          key={i}
          value={value}
        >{value} px
        </Option>
      ))}
      </Select>
    )
  }
}