import React from 'react';
import { Menu, Button, Statistic, Row, Col } from 'antd';
import { connect } from 'dva';
import Web3 from 'web3';

export default class AccountComponent extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       privateKey: '',
       address: '',
       amountUSD: 0,
       amountGLD: 0,
     };
     this.loadBlockchainData = this.loadBlockchainData.bind(this);
     this.generateAccount = this.generateAccount.bind(this);
   }

  generateAccount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider);
      // const accounts = await web3.eth.getAccounts();
      const account = await web3.eth.accounts.create();
      console.log(account)
      if (account.privateKey) {
        this.setState({
          address: account.address,
          privateKey: account.privateKey
        })
      }
  }

  render() {
    const { address, privateKey, amountUSD, amountGLD } = this.state;
    return (
      <div>
        <br />
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Button type="primary" onClick={this.generateAccount}>Generate Account</Button>
          </Col>
          <Col span={6}>
            <Button>Import Private Keys</Button>
          </Col>
          <Col span={6} />
        </Row>
        <br />
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Button>Load SeedPhases</Button>
          </Col>
          <Col span={6}>
            <a href="https://celo.org/build/faucet"><Button>Topup</Button></a>
          </Col>
          <Col span={6} />
        </Row>
        <br />
        <br />
        {address ? (<div>
          Address: {address}
          <br />
          Private Key: {privateKey}
        </div>) : ''}
        <br />
        <br />
        <Row>
          <h3>Balance</h3>
        </Row>
        <Row gutter={16}>
          <Col span={6} />
          <Col span={6}>
            <Statistic title="Balance (cUSD)" value={amountUSD} precision={2} />
          </Col>
          <Col span={6}>
            <Statistic title="Balance (cGLD)" value={amountGLD} precision={4} />
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}
