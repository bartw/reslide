import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class Preview extends React.Component {
  render() {
    return (
      this.props.slide ?
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.slide.name}</h3>
          </div>
          <div className="panel-body" style={{ height: 450 * this.props.scale + 'px' }}>
            <div style={{ height: '400px', width: '600px', transform: 'scale(' + this.props.scale + ', ' + this.props.scale + ')', transformOrigin: '0 0' }}>
              <ReactMarkdown source={this.props.slide.content} escapeHtml />
            </div>
          </div>
        </div>
        : null
    );
  }
}