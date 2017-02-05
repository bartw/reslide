import React from 'react';
import ListItem from './ListItem.jsx';

export default class List extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.slides.map((slide) =>
          <ListItem key={slide.id} slide={slide} onSelect={this.props.onSelect} />
        )}
      </ul>
    );
  }
}