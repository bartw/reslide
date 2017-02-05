import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import SlideShow from './SlideShow.jsx';
import List from './List.jsx';

export default class SideBar extends React.Component {
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
        <SlideShow slides={this.props.slides} show={this.state.showModal} stop={this.stop} />
      </div>
    );
  }
}