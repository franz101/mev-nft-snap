import { UnlockOutlined } from '@ant-design/icons';
import { Result, Button, Avatar, Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { invokeSnap } from '../utils';

const ContentWrapper = () => {
  return (
    <Content style={{ zIndex: 1, height: '9000px', overflowY: 'scroll' }}>
      <Result
        icon={<UnlockOutlined color="success" />}
        title="Secure your transactions"
        subTitle="Connect your MetaMask wallet, to have transactions insights"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              invokeSnap('hello');
            }}
          >
            Install
          </Button>,
          <Button key="buy">Set up secure wallet</Button>,
        ]}
      />
      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>1</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={<img src="/img/image2.png" />}
          ></Card>
        }
        title="Install the MEV Chrome Extension"
        subTitle="Gain insights into your NFTs"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              invokeSnap('');
            }}
          >
            Install
          </Button>,
        ]}
      />
      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>2</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={<img src="/img/image4.png" />}
          ></Card>
        }
        title="Gain insights into your NFTs"
        subTitle="Understand if the market is trustworthy"
        extra={[
          <Button
            key="console"
            onClick={() => {
              invokeSnap('');
            }}
          >
            Learn More
          </Button>,
        ]}
      />
      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>3</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={<img src="/img/image5.png" />}
          ></Card>
        }
        title="Connect to MetaMask"
        subTitle="Understand better what you are signing"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              invokeSnap('');
            }}
          >
            Install
          </Button>,
        ]}
      />
      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>3</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={<img src="/img/image6.png" />}
          ></Card>
        }
        title="Connect to MetaMask"
        subTitle="Understand better what you are signing"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              invokeSnap('');
            }}
          >
            Connect
          </Button>,
        ]}
      />
      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>4</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={<img src="/img/image6.png" style={{ maxWidth: '300px' }} />}
          ></Card>
        }
        title="Transfer with Flashbots button"
        subTitle="Don't waste gas or get front-run"
        extra={[
          <Button
            key="console"
            onClick={() => {
              invokeSnap('');
            }}
          >
            What is Flashbots?
          </Button>,
        ]}
      />

      <div style={{ textAlign: 'center', paddingTop: '300px' }}>
        <Avatar size={40}>5</Avatar>
      </div>

      <Result
        icon={
          <Card
            hoverable
            // style={{ width: 240, maxHeight: 300 }}
            cover={
              <img src="https://miro.medium.com/max/1200/1*Q8AgUIzF6WnxJlwvBvZ__w.png" />
            }
          ></Card>
        }
        title="Secure your NFT with Gnosis Safe"
        subTitle="Even if your private key is compromised, your NFTs are safe"
        extra={[
          <Button
            key="console"
            type="primary"
            onClick={() => {
              invokeSnap('wallet');
            }}
          >
            Create wallet
          </Button>,
          <Button
            key="console"
            onClick={() => {
              invokeSnap('wallet');
            }}
          >
            Learn more
          </Button>,
        ]}
      />
    </Content>
  );
};

export default ContentWrapper;
