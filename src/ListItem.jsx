import React from 'react';
import Preview from './Preview.jsx';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelect(this.props.slide);
  }

  render() {
    return (
      <li className="list-group-item" onClick={this.handleClick}>
        <Preview slide={this.props.slide} scale="0.5" />
      </li>
    );
  }
}