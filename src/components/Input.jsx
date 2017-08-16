import React, {Component} from 'react';
import {observer} from 'mobx-react';
import TextField from 'material-ui/TextField';

@observer
class Input extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <TextField name={this.props.name}
        value={this.props.value}
        onChange={this.onChange} />
    );
  }

  onChange(event) {
    this.props.onChange(event.target.name, event.target.value);
  }
};

export default Input;
