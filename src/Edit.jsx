import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name === 'name' ? event.target.value : this.props.slide.name;
    const content = event.target.name === 'content' ? event.target.value : this.props.slide.content;
    this.props.onChange(this.props.slide, name, content);
  }

  render() {
    return (
      this.props.slide ?
        <form style={{ height: '400px' }}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="name" placeholder="Name" value={this.props.slide.name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea className="form-control" id="content" name="content" placeholder="Content" value={this.props.slide.content} onChange={this.handleChange} style={{ height: '200px', resize: 'non' }} />
          </div>
        </form>
        : null
    );
  }
}