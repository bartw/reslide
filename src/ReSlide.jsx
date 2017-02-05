import React from 'react';
import SideBar from './SideBar.jsx';
import Details from './Details.jsx';

function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default class ReSlide extends React.Component {
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