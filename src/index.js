import React from 'react';
import ReactDOM from 'react-dom';

class SlideEdit extends React.Component {
  render() {
    return (
      <div>
        <input type="text" value={this.props.slide.name} />
      </div>
    );
  }
}

class SlidePreview extends React.Component {
  render() {
    return (
      <div>{this.props.slide.name}</div>
    );
  }
}

class SlideDetails extends React.Component {
  render() {
    return (
      <div>
        <SlidePreview slide={this.props.slide} />
        <SlideEdit slide={this.props.slide} />
      </div>
    );
  }
}

class SlideList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.slides.map((slide) =>
          <li key={slide.name}>
            <SlidePreview slide={slide} />
          </li>
        )}
      </ul>
    );
  }
}

class ReSlide extends React.Component {
  render() {
    return (
      <div>
        <SlideList slides={this.props.slides} />
        <SlideDetails slide={this.props.slides[0]} />
      </div>
    );
  }
}

const SLIDES = [
  { name: "slide1" },
  { name: "slide2" },
  { name: "slide3" },
  { name: "slide4" },
  { name: "slide5" }
];

ReactDOM.render(
  <ReSlide slides={SLIDES} />,
  document.getElementById('root')
);