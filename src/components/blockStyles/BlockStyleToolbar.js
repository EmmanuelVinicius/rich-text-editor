import React, { Component } from "react";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import BlockStyleButton from "./BlockStyleButton";

export const BLOCK_TYPES = [
  { label: 'blockquote', style: "blockquote" },
  { label: "unordered", style: "unordered-list-item" },
  { label: "ordered", style: "ordered-list-item" },
  { label: "code", style: "code-block" }
];

export const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" }
]

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default class BlockStyleToolbar extends Component {
  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <span className="RichEditor-controls">
        <HeaderStyleDropdown
          headerOptions={HEADER_TYPES}
          active={blockType}
          onToggle={this.props.onToggle}
        />
      <br />
        {BLOCK_TYPES.map(type => {
          return (
            <BlockStyleButton
              active={type.style === blockType}
              onToggle={this.props.onToggle}
              style={type.style}
              key={type.label}
              type={type}
            />
          )
        })}
      </span>
    )
  }
}