import React from 'react';
import ReactDOM from 'react-dom';

class SlideEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.slide, event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.props.slide.name} onChange={this.handleChange} />
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
        <SlideEdit slide={this.props.slide} onChange={this.props.onChange} />
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      slides: [
        { name: "slide1" },
        { name: "slide2" },
        { name: "slide3" },
        { name: "slide4" },
        { name: "slide5" }
      ]
    };
  }

  handleChange(slideToUpdate, name) {
    const slides = this.state.slides.map(function (slide) {
      if (slide === slideToUpdate) {
        slide.name = name;
      }
      return slide;
    });
    this.setState({ slides: slides })
  }

  render() {
    return (
      <div>
        <SlideList slides={this.state.slides} />
        <SlideDetails slide={this.state.slides[0]} onChange={this.handleChange} />
      </div>
    );
  }
}

ReactDOM.render(
  <ReSlide />,
  document.getElementById('root')
);