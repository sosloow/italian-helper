import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import CrudTable from '../CrudTable';

@inject('store') @observer
class Words extends Component {
  constructor(props) {
    super(props);

    this.tableColumns = {
      text: 'Слово',
      translation: 'Перевод',
      imageUrl: 'Картинка (ссылка)'
    };

    this.Word = this.props.store.Word;

    this.words = this.Word.items;

    this.onCreate = this.onCreate.bind(this);
  }

  onCreate(newWord) {
    this.Word.create(newWord);
  }

  render() {
    return (
      <div>
        <CrudTable
          columns={this.tableColumns}
          rows={this.words}
          onCreate={this.onCreate}
          onRemove={this.Word.remove} />
      </div>
    );
  }
};

export default Words;
