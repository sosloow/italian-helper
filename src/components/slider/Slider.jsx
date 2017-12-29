import _ from 'lodash';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import Paper from 'material-ui/Paper';
import NumberSlider from 'material-ui/Slider';

const slideStyle = {
  height: '90%',
  width: '100%',
  margin: '0 auto',
  textAlign: 'center'
};

const imgStyle = {
  maxHeight: '100%',
  maxWidth: '100%',
  display: 'inline-block',
  margin: '0 auto'
};

const numberSliderStyle = {
  position: 'absolute',
  left: 20,
  top: 20,
  width: '100%',
  maxWidth: 200
};

@inject('store') @observer
class Slider extends Component {
  @observable query = [];
  @observable activeSlide = {};
  @observable slideInterval = 3000;

  constructor(props) {
    super(props);
    let lastSlideUpdate = 0;

    this.words = this.props.store.Word.items;

    this.nextSlide = this.nextSlide.bind(this);
    this.onIntervalInputChange = this.onIntervalInputChange.bind(this);

    setInterval(() => {
      if (lastSlideUpdate + this.slideInterval > Date.now()) {
        return;
      }

      lastSlideUpdate = Date.now();
      this.nextSlide();
    }, 100);
  }

  nextSlide() {
    if (this.query.length < 1) {
      this.query = _.shuffle(Array.from(this.words));
    }

    this.activeSlide = _.first(Array.from(this.query)) || {};
    this.query = _.drop(Array.from(this.query));

  }

  onIntervalInputChange(event, value) {
    this.slideInterval = value;
  }

  render() {
    return (
      <div>
        <NumberSlider
          min={1000}
          max={10000}
          step={100}
          value={this.slideInterval}
          style={numberSliderStyle}
          onChange={this.onIntervalInputChange} />
        <Paper style={slideStyle} zDepth={1}>
          <img style={imgStyle} src={this.activeSlide.imageUrl} />
        </Paper>
      </div>
    );
  }
};

export default Slider;
