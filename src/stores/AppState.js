import {observable} from 'mobx';
import Word from './Word';

class AppState {
  @observable Word = new Word();
}

export default AppState;
