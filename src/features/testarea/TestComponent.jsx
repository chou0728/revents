import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'semantic-ui-react'
import { incrementCounter, decrementCounter } from './testActions'

// 將store中的state整合在一起
const mapState = state => ({
  data: state.test.data
});

// 將需要用到的action整合在一起
const actions = {
  incrementCounter,
  decrementCounter
};

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <h1>TestComponent</h1>
        <h3>this is : {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment'/>
        <Button onClick={decrementCounter} color='red' content='Decrement'/>
      </div>
    );
  }
}

//透過connect過完水後回傳一個新的component後，TestComponent中的props就有store裡的action與state值了
//透過React devTool 可以看到TestComponent component被 connect包起來
export default connect(
  mapState,
  actions
)(TestComponent);
