import React from 'react';
import { Menu, Button } from 'antd';
import AccountComponent from './AccountComponent';
import TransferComponent from './TransferComponent';

const { SubMenu } = Menu;

export default class MenuComponent extends React.Component {
  state = {
    current: 'ACCOUNT',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
  	const { current } = this.state;

    return (
      <div>
        <Menu
          defaultSelectedKeys={['ACCOUNT']}
          defaultOpenKeys={['ACCOUNT']}
          mode="horizontal"
          onClick={this.handleClick}
        >
          <Menu.Item key="ACCOUNT">
            <span>Account Setting</span>
          </Menu.Item>
          <Menu.Item key="TRANSFER">
            <span>Transfer Token</span>
          </Menu.Item>
        </Menu>
        {current === 'ACCOUNT' ? (<AccountComponent />) : (<TransferComponent />)}
      </div>
    );
  }
}