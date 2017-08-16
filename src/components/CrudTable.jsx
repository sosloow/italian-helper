import _ from 'lodash';
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Input from './Input';

@observer
class TableSimple extends Component {
  @observable newItem = {};

  constructor(props) {
    super(props);

    this.resetNewItem();

    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onChange(field, value) {
    this.newItem[field] = value;
  }

  onCreate() {
    this.props.onCreate(this.newItem);

    this.resetNewItem();
  }

  resetNewItem() {
    this.newItem = {};
  }

  onRemove(index) {
    return () => {
      this.props.onRemove(index);
    }
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            {_.values(this.props.columns).map((columnName, idx) =>
              <TableHeaderColumn key={idx}>{columnName}</TableHeaderColumn>
            )}
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.rows.map((row, idx) =>
            <TableRow key={idx}>
              {_.keys(this.props.columns).map((columnKey, idy) =>
                <TableRowColumn key={idy}>{row[columnKey]}</TableRowColumn>
              )}
              <TableRowColumn>
                <RaisedButton onClick={this.onRemove(idx)} label="Remove" />
              </TableRowColumn>
            </TableRow>
          )}
          <TableRow>
            {_.keys(this.props.columns).map((columnKey, idx) =>
              <TableRowColumn key={idx}>
                <Input
                  name={columnKey}
                  value={this.newItem[columnKey]}
                  onChange={this.onChange} />
              </TableRowColumn>
            )}
            <TableRowColumn>
              <RaisedButton onClick={this.onCreate} label="Create" />
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
};

export default TableSimple;