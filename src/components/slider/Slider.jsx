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
  height: '100%',
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
  @observable slideInterval = 1000;

  constructor(props) {
    super(props);

    this.words = this.props.store.Word.items;

    this.nextSlide = this.nextSlide.bind(this);

    this.nextSlide();
    setInterval(this.nextSlide, 1000);
  }

  nextSlide() {
    if (this.query.length < 1) {
      this.query = _.shuffle(_.clone(this.words.slice()));
    }

    this.activeSlide = _.first(this.query.slice()) || {};
    this.query = _.drop(this.query.slice());
  }

  render() {
    return (
      <div>
        <NumberSlider
          min={500}
          max={3000}
          step={100}
          value={this.slideInterval}
          style={numberSliderStyle} />
        <Paper style={slideStyle} zDepth={1}>
          <img style={imgStyle} src={this.activeSlide.imageUrl} />
        </Paper>
      </div>
    );
  }
};

export default Slider;
