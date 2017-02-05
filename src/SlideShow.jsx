import React from 'react';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import Preview from './Preview.jsx';

export default class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.state = { current: this.props.slides.length ? 0 : null };
  }

  previous() {
    const current = this.state.current > 0 ? this.state.current - 1 : 0;
    this.setState({ current: current });
  }

  next() {
    const current = this.state.current < (this.props.slides.length - 1) ? this.state.current + 1 : this.state.current;
    this.setState({ current: current });
  }

  render() {
    return (
      <Modal show={this.props.show} bsSize="large" onHide={this.props.stop}>
        <Modal.Header closeButton>
          <Modal.Title>Slideshow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Preview slide={this.props.slides[this.state.current]} scale="1" />
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button onClick={this.previous}>Previous</Button>
            <Button onClick={this.next}>Next</Button>
            <Button onClick={this.props.stop}>Stop</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}