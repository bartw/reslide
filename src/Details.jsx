import React from 'react';
import Preview from './Preview.jsx';
import Edit from './Edit.jsx';

export default class Details extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Preview slide={this.props.slide} scale="1" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Edit slide={this.props.slide} onChange={this.props.onChange} onRemove={this.props.onRemove} />
          </div>
        </div>
      </div>
    );
  }
}