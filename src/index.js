import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

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
        <div>
          <div><input type="text" name="text" value={this.props.slide.name} onChange={this.handleChange} /></div>
          <div><textarea name="content" value={this.props.slide.content} onChange={this.handleChange} /></div>
        </div>
        : null
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      this.props.slide ?
        <div>
          <div>{this.props.slide.name}</div>
          <div><ReactMarkdown source={this.props.slide.content} escapeHtml /></div>
        </div>
        : null
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
      <div>
        <SideBar style={this.sideBarStyle} slides={this.state.slides} onAdd={this.handleAdd} onSelect={this.handleSelect} />
        <Details slide={this.state.selectedSlide} onChange={this.handleChange} />
      </div>
    );
  }
}

ReactDOM.render(
  <ReSlide />,
  document.getElementById('root')
);