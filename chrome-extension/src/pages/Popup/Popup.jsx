import React, { useEffect, useState, Fragment } from 'react';
import Logo from '../../containers/Logo';
import './Popup.css';
import {
  Col,
  Divider,
  Row,
  Descriptions,
  Progress,
  Layout,
  Tooltip,
  Button,
  Card,
  Tag,
  Typography,
  Input,
} from 'antd';
import {
  QuestionCircleOutlined,
  WalletOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const option = {
  minimumFractionDigits: 4,
  style: 'percent',
};
const pctFormatter = new Intl.NumberFormat('en-US', option);

const Popup = () => {
  const [state, setState] = useState('');
  const [inputAddress, setInputAddress] = useState(
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
  );
  const [addressStats, setAddressStats] = useState({});
  const [diamondStats, setDiamondStats] = useState({});
  const [holdingStats, setHoldingStats] = useState({});
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      chrome.storage.sync.get(['tabUrl', 'chain', 'asset'], (data) => {
        setState(data);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch(
        'https://green-holy-isle.discover.quiknode.pro/716b917f44e3ee4f2351e6ca8553161f1d4720ff/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-qn-api-version': '1',
          },
          // body: '{\n    "id":67,\n    "jsonrpc":"2.0",\n    "method":"qn_fetchNFTCollectionDetails",\n    "params":{\n      "contracts": [\n        "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",\n        "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7"\n      ]\n    }\n  }',
          body: JSON.stringify({
            id: 67,
            jsonrpc: '2.0',
            method: 'qn_fetchNFTCollectionDetails',
            params: {
              contracts: [inputAddress],
            },
          }),
        }
      );
      const json = await response.json();
      setMetadata(json.result[0]);
      //name: "Meebits", description: "Meebits", address: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",…}
    };
    const fetchStats = async () => {
      const response = await fetch(
        'http://localhost:8000/api/stat/' + inputAddress
      );
      const json = await response.json();
      setAddressStats(json);
    };
    const fetchHands = async () => {
      const response = await fetch(
        'http://localhost:8000/api/diamond/' + inputAddress
      );
      const json = await response.json();
      setDiamondStats(json);
    };
    const fetchHolding = async () => {
      const response = await fetch(
        'http://localhost:8000/api/holding/' + inputAddress
      );
      const json = await response.json();
      setHoldingStats(json);
    };
    if (inputAddress.length === 42) {
      fetchHands();
      fetchHolding();
      fetchStats();
      fetchMetadata();
    }
  }, [inputAddress]);

  //bored
  //0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d

  return (
    <Layout>
      {/* <Header>    <Title>MEV NFT</Title>
</Header> */}
      <Layout>
        {/* <Sider>left sidebar</Sider> */}
        <Content>
          <Row
            gutter={[24, 24]}
            style={{
              width: '100%',
              paddingLeft: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <Col span={12}>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href="http://localhost:3006"
                style={{ width: '100%' }}
                type="primary"
                icon={<WalletOutlined />}
              >
                Connect Wallet
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: '100%' }}
                onClick={() => {
                  chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                      chrome.tabs.sendMessage(
                        tabs[0].id,
                        {
                          message: 'autoFill',
                          textToFill: 'some text',
                        },
                        function (response) {}
                      );
                    }
                  );
                }}
                icon={<SettingOutlined />}
              >
                Settings
              </Button>
            </Col>
          </Row>
          <Card title="Data provided by MEV NFT">
            <Input
              value={inputAddress}
              onChange={(evt) => setInputAddress(evt.currentTarget.value)}
              placeholder="Check NFT contract 0x..."
            />
            <p style={{ paddingTop: '30px' }}>
              Collection: {metadata.name || 'Unknown'}
            </p>
            {/* <Progress type="circle" percent={70} width={80} /> */}
            {inputAddress.length !== 42 && <Logo />}
            {inputAddress.length === 42 && (
              <Row
                gutter={[24, 24]}
                style={{ paddingTop: '0px', width: '100%' }}
              >
                <Col span={12}>
                  <p>Trust score</p>
                </Col>

                <Col span={12}>
                  {/* <Tag color="default">default</Tag> */}
                  <Tooltip placement="topLeft" title="Based on our algorithm">
                    <Button
                      style={{ width: '100%' }}
                      icon={<QuestionCircleOutlined />}
                    >
                      70
                    </Button>
                  </Tooltip>
                </Col>
                {addressStats && (
                  <Fragment>
                    <Col span={12}>
                      <p>Historic MEV Activity</p>
                    </Col>
                    <Col span={12}>
                      {pctFormatter.format(addressStats.mev_b_mean * 2)}{' '}
                      {addressStats.mev_b_mean > 0 && (
                        <Tag color="volcano">
                          high ({addressStats.mev_b_sum})
                        </Tag>
                      )}
                    </Col>
                    <Col span={12}>
                      <p>Historic Phishing Activity</p>
                    </Col>
                    <Col span={12}>
                      {pctFormatter.format(addressStats.phisher_b_mean * 2)}{' '}
                      {addressStats.mev_b_mean > 0 && (
                        <Tag color="red">
                          very high ({addressStats.phisher_b_sum})
                        </Tag>
                      )}
                    </Col>
                  </Fragment>
                )}
                {diamondStats && (
                  <Fragment>
                    <Col span={12}>
                      <p>Diamond hands 💎</p>
                    </Col>
                    <Col span={12}>{diamondStats.dt_count}</Col>
                    <Col span={12}>
                      <p>Max holding time 💎 since</p>
                    </Col>
                    <Col span={12}>
                      {diamondStats.dt_max &&
                        diamondStats.dt_mean.split('.')[0]}
                    </Col>
                    <Col span={12}>
                      <p>Mean holding time 💎 since</p>
                    </Col>
                    <Col span={12}>
                      {diamondStats.dt_mean &&
                        diamondStats.dt_mean.split('.')[0]}{' '}
                      <Tag color="green">very high</Tag>
                    </Col>
                  </Fragment>
                )}
                {holdingStats && (
                  <Fragment>
                    <Col span={12}>
                      <p>Sellers</p>
                    </Col>
                    <Col span={12}>{holdingStats.dt_count}</Col>
                    <Col span={12}>
                      <p>Average time before selling 🕑</p>
                    </Col>
                    <Col span={12}>
                      {holdingStats.dt_max &&
                        (
                          (holdingStats.diff_mean * 0.000000001) /
                          60 /
                          60
                        ).toFixed(2)}{' '}
                      h
                    </Col>
                    <Col span={12}>
                      <p>Median time before selling 🕑</p>
                    </Col>
                    <Col span={12}>
                      {holdingStats.diff_median &&
                        (
                          (holdingStats.diff_median * 0.000000001) /
                          60 /
                          60
                        ).toFixed(2)}{' '}
                      h<Tag color="green">very high</Tag>
                    </Col>
                  </Fragment>
                )}
                {/* <Col span={12}>
                <p>Card content</p>
              </Col>
              <Col span={12}>
                <Progress percent={30} size="small" status="active" />
              </Col> */}
              </Row>
            )}
            <p>Card content</p>
          </Card>
        </Content>
      </Layout>
      <Footer>
        Developer Info
        <br />
        Url: {state.tabUrl || '...'}
        <br />
        Chain: {state.chain || '...'}
        <br />
        Asset: {state.asset || '...'}
        <br />
      </Footer>
    </Layout>
  );
};

export default Popup;
