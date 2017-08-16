import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {inject} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {Tabs, Tab} from 'material-ui/Tabs';

import Words from './words';
import Slider from './slider/Slider.jsx';

@inject('store')
class App extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab data-route="/" label="Слайды">
            <Slider />
          </Tab>
          <Tab data-route="/words" label="Список слов">
            <Words />
          </Tab>
        </Tabs>
        <DevTools />
      </div>
    );
  }
};

export default App;
