import './App.css';
// import { useContext } from 'react';
import { UnlockOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Layout, Result } from 'antd';
import styled from 'styled-components';
import { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { MetaMaskProvider } from './hooks';
import { HeaderRow } from './components/Header';
import { Footer } from './components/Footer';
import { sendHello } from './utils';

const { Header, Content } = Layout;
// const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    [],
  );
  return (
    <MetaMaskProvider>
      <Wrapper>
        <Layout style={{}}>
          <Header style={{ zIndex: 1 }}>
            <HeaderRow />
            <Divider />
          </Header>
          <Layout>
            <Content
              style={{ zIndex: 1, height: '9000px', overflowY: 'scroll' }}
            >
              <Result
                icon={<UnlockOutlined color="success" />}
                title="Secure your transactions"
                subTitle="Connect your MetaMask wallet, to have transactions insights"
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => {
                      sendHello('hello');
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
                      sendHello('');
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
                      sendHello('');
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
                      sendHello('');
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
                      sendHello('');
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
                    cover={
                      <img
                        src="/img/image6.png"
                        style={{ maxWidth: '300px' }}
                      />
                    }
                  ></Card>
                }
                title="Transfer with Flashbots button"
                subTitle="Don't waste gas or get front-run"
                extra={[
                  <Button
                    key="console"
                    onClick={() => {
                      sendHello('');
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
                      sendHello('wallet');
                    }}
                  >
                    Create wallet
                  </Button>,
                  <Button
                    key="console"
                    onClick={() => {
                      sendHello('wallet');
                    }}
                  >
                    Learn more
                  </Button>,
                ]}
              />
            </Content>
            <Particles
              id="tsparticles"
              url="/particles.json"
              init={particlesInit}
              loaded={particlesLoaded}
            />
          </Layout>

          <Footer />
        </Layout>
      </Wrapper>
    </MetaMaskProvider>
  );
}

export default App;
