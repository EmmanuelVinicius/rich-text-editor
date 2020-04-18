import React, { Component } from "react";
import { Button } from 'antd';
import {
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
  BlockOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css';

const icons = {
  ordered: <OrderedListOutlined />,
  unordered: <UnorderedListOutlined />,
  code: <CodeOutlined />,
  blockquote: <BlockOutlined />
}
export default class BlockStyleButton extends Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) className += 'RichEditor-activeButton';
    return (
      <Button
        shape="round"
        className={className}
        onClick={this.onToggle}
        icon={icons[this.props.type.label]}
        style={{margin: '5px'}}
        />
    );
  };
}
