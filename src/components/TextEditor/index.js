import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from './../plugins/highlightPlugin'
import addLinkPlugin from './../plugins/linkPlugin'
import BlockStyleToolbar, { getBlockStyle } from './../blockStyles/BlockStyleToolbar'
import { Button, Tooltip, Select } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  HighlightOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css';
import FontSizeDropdown from '../blockStyles/FontSizeDropdown';
const { Option } = Select;

const highlightPlugin = createHighlightPlugin();

const buttonStyle = {
  margin: '5px'
}

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.plugins = [
      highlightPlugin,
      addLinkPlugin
    ]
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }


  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onHighlightClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
  }

  _onAddLinkClick = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -')
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }

  _onToggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _onToggleFontSize = fontSize => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, fontSize));
  }


  render() {
    return (
      <div
        className='editor'
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '20px',
          border: '1px solid #c4c4c4',
          borderRadius: '10px',
          maxWidth: '700px',

        }}
      ><div
        className='buttons'
        style={{
          textAlign: 'center',
          width: '100%'
        }}
      >
          <Button
            icon={<BoldOutlined />}
            shape="round"
            onClick={this._onBoldClick.bind(this)}
            style={buttonStyle}
            />
            <Button
            shape="round"
            icon={<ItalicOutlined />}
            onClick={this._onItalicClick.bind(this)}
            style={buttonStyle}
            />
            <Button
            shape="round"
            icon={<UnderlineOutlined />}
            onClick={this._onUnderlineClick.bind(this)}
            style={buttonStyle}
            />
            <Button
            shape="round"
            icon={<HighlightOutlined />}
            onClick={this._onHighlightClick.bind(this)}
            style={buttonStyle}
            />
            <Button
            shape="round"
            icon={<LinkOutlined />}
            onClick={this._onAddLinkClick.bind(this)}
            style={buttonStyle}
          />
        </div>
        <div
          className='buttons'
          style={{
            textAlign: 'center',
            width: '100%'
          }}
        >

          <FontSizeDropdown
            editorState={this.state.editorState}
            onToggle={this._onToggleFontSize}
          />

          <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this._onToggleBlockType}
            style={{ width: '100%' }}
          />
        </div>
        <hr />
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={this.plugins}
          textAlignment='left'
        />
        <hr />
      </div >
    );
  }
}
