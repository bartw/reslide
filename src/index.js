import React from 'react';
import ReactDOM from 'react-dom';

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
    this.props.onChange(this.props.slide, event.target.value);
  }

  render() {
    return (
      this.props.slide ?
        <div>
          <input type="text" value={this.props.slide.name} onChange={this.handleChange} />
        </div>
        : null
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      this.props.slide ? <div>{this.props.slide.name}</div> : null
    );
  }
}

class Details extends React.Component {
  render() {
    return (
      <div>
        <Preview slide={this.props.slide} />
        <Edit slide={this.props.slide} onChange={this.props.onChange} />
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
          <li onClick={this.handleClick}>
            <Preview slide={this.props.slide} />
          </li>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.slides.map((slide) =>
          <ListItem key={slide.id} slide={slide} onSelect={this.props.onSelect} />
        )}
      </ul>
    );
  }
}

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <List slides={this.props.slides} onSelect={this.props.onSelect} />
        <button onClick={this.props.onAdd}>Add</button>
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
        { id: generateGuid(), name: "slide1" },
        { id: generateGuid(), name: "slide2" },
        { id: generateGuid(), name: "slide3" },
        { id: generateGuid(), name: "slide4" },
        { id: generateGuid(), name: "slide5" }
      ],
      selectedSlide: null
    };
  }

  handleChange(slideToUpdate, name) {
    const slides = this.state.slides.map(function (slide) {
      if (slide === slideToUpdate) {
        slide.name = name;
      }
      return slide;
    });
    this.setState({ slides: slides });
  }

  handleAdd() {
    const newSlide = { id: generateGuid(), name: "newslide" };
    const slides = this.state.slides.concat(newSlide);
    this.setState({ slides: slides, selectedSlide: newSlide });
  }

  handleSelect(slide) {
    this.setState({ selectedSlide: slide });
  }

  render() {
    return (
      <div>
        <SideBar slides={this.state.slides} onAdd={this.handleAdd} onSelect={this.handleSelect} />
        <Details slide={this.state.selectedSlide} onChange={this.handleChange} />
      </div>
    );
  }
}

ReactDOM.render(
  <ReSlide />,
  document.getElementById('root')
);