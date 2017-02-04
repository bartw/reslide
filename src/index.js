import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';

function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class Edit extends React.Component {
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

class Preview extends React.Component {
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

class Details extends React.Component {
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
            <Edit slide={this.props.slide} onChange={this.props.onChange} />
          </div>
        </div>
      </div>
    );
  }
}

class ListItem extends React.Component {
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

class List extends React.Component {
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

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.state = { showModal: false };
  }

  start() {
    this.setState({ showModal: true });
  }

  stop() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <div className="row" style={{ maxHeight: '700px', height: '700px', overflowY: 'scroll' }}>
          <List slides={this.props.slides} onSelect={this.props.onSelect} />
        </div>
        <div className="row" style={{ height: '100px' }}>
          <div className="col-md-12">
            <ButtonToolbar>
              <Button onClick={this.props.onAdd}>New slide</Button>
              <Button bsStyle="success" onClick={this.start}>Start</Button>
            </ButtonToolbar>
          </div>
        </div>
        <Modal show={this.state.showModal} bsSize="large" onHide={this.stop}>
          <Modal.Header closeButton>
            <Modal.Title>Slideshow</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.stop}>Stop</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class ReSlide extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      slides: [
        { id: generateGuid(), name: 'slide1', content: '# title\nsome content' },
        { id: generateGuid(), name: 'slide2', content: '# title\n```js\nconsole.log("hello world");\n```' },
        { id: generateGuid(), name: 'slide3', content: '# title\n## subtitle\nmore content' },
        { id: generateGuid(), name: 'slide4', content: 'does this ever stop' },
        { id: generateGuid(), name: 'slide5', content: 'finally' }
      ],
      selectedSlide: null
    };
  }

  handleChange(slideToUpdate, name, content) {
    const slides = this.state.slides.map(function (slide) {
      if (slide === slideToUpdate) {
        slide.name = name;
        slide.content = content;
      }
      return slide;
    });
    this.setState({ slides: slides });
    this.sideBarStyle = {
      backgroundColor: 'blue'
    };
  }

  handleAdd() {
    const newSlide = { id: generateGuid(), name: 'newslide', content: '' };
    const slides = this.state.slides.concat(newSlide);
    this.setState({ slides: slides, selectedSlide: newSlide });
  }

  handleSelect(slide) {
    this.setState({ selectedSlide: slide });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <SideBar style={this.sideBarStyle} slides={this.state.slides} onAdd={this.handleAdd} onSelect={this.handleSelect} />
        </div>
        <div className="col-md-9">
          <Details slide={this.state.selectedSlide} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ReSlide />,
  document.getElementById('root')
);