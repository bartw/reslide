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
      <div>
        <input type="text" value={this.props.slide.name} onChange={this.handleChange} />
      </div>
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div>{this.props.slide.name}</div>
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

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.slides.map((slide) =>
          <li key={slide.id}>
            <Preview slide={slide} />
          </li>
        )}
      </ul>
    );
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onAdd();
  }

  render() {
    return (
      <div>
        <List slides={this.props.slides} />
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

class ReSlide extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      slides: [
        { id: generateGuid(), name: "slide1" },
        { id: generateGuid(), name: "slide2" },
        { id: generateGuid(), name: "slide3" },
        { id: generateGuid(), name: "slide4" },
        { id: generateGuid(), name: "slide5" }
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
    this.setState({ slides: slides });
  }

  handleAdd() {
    const slides = this.state.slides.concat({ id: generateGuid(), name: "newslide" });
    this.setState({ slides: slides });
  }

  render() {
    return (
      <div>
        <SideBar slides={this.state.slides} onAdd={this.handleAdd} />
        <Details slide={this.state.slides[0]} onChange={this.handleChange} />
      </div>
    );
  }
}

ReactDOM.render(
  <ReSlide />,
  document.getElementById('root')
);