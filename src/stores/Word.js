import {action, observable} from 'mobx';

export default class Scenario {
  @observable items;

  constructor() {
    try {
      this.items = JSON.parse(localStorage.getItem('words'));
    } catch(error) {
      this.items = [];
    }

    this.remove = this.remove.bind(this);
  }

  @action create(newItem) {
    this.items.push(newItem);

    this.save();
  }

  @action remove(index) {
    this.items.splice(index, 1);

    this.save();
  }

  save() {
    localStorage.setItem('words', JSON.stringify(this.items));
  }
}
