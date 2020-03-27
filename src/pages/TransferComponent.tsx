import React from 'react';
import { Menu, Button, Row, Col, Input, Select } from 'antd';
import { connect } from 'dva';
import contractkit from '@celo/contractkit';

const NODE_URL = 'https://alfajores-forno.celo-testnet.org'

async function sendPayment(params, account) {
  const recipient = params.to
  const amount = params.amount
  const token = params.token

  const kit = contractkit.newKit(NODE_URL)
  
  // Set up your account in contract kit
  kit.addAccount(account.privateKey)
  kit.defaultAccount = account.address

  // Get the right token contract
  let contract
  if (token.toLowerCase() === 'cusd') {
    contract = await kit.contracts.getStableToken()
  }
  else if (token.toLowerCase() === 'cgld') {
    contract = await kit.contracts.getGoldToken()
  }

  try {
    const tx = await contract.transfer(recipient, amount).send()
    const receipt = await tx.waitReceipt()
    const newBalance = await contract.balanceOf(account.address)
  } catch (error) {
    console.error('Error ', error)
  }
  finally {
    kit.stop()
  }
}

export default class TransferComponent extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }

  render() {
    const selectAfter = (
      <Select defaultValue="cUSD" style={{ width: 80 }}>
        <Option value="cUSD">cUSD</Option>
        <Option value="cGLD">cGLD</Option>
      </Select>
    );

    return (
      <div>
        <br />
        <br />
        <Row>
          <h3>Transfer</h3>
        </Row>
        <br />
        <br />
        <Row gutter={16}>
          <Col span={6} />
          <Col span={12}>
            Receiver Address: 
            <Input placeholder="0x12345678abacasdfasdf" width="50% "/>
          </Col>
          <Col span={6} />
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={6} />
          <Col span={12}>
            Amount
            <Input addonAfter={selectAfter}/>
          </Col>
          <Col span={6} />
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={6} />
          <Col span={12}>
            <Button type="primary" >Send</Button>
          </Col>
          <Col span={3}>
            <a href="https://alfajores-blockscout.celo-testnet.org/"><Button>View it On Blockchain</Button></a>
          </Col>
          <Col span={3} />
        </Row>
      </div>
    );
  }
}
