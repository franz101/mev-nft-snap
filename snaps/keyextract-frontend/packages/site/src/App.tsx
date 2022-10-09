import './App.css';
// import { useContext } from 'react';
import { UnlockOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Result } from 'antd';
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
        <Layout>
          <Header>
            <HeaderRow />
            <Divider />
          </Header>
          <Layout>
            <Content style={{ backgroundColor: '#141414' }}>
              <Result
                icon={<UnlockOutlined color="success" />}
                title="Secure your transactions"
                subTitle="Connect your MetaMask wallet, to have transactions insights"
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => {
                      sendHello();
                    }}
                  >
                    Install
                  </Button>,
                  <Button key="buy">Set up secure wallet</Button>,
                ]}
              />
              <Particles
                id="tsparticles"
                url="/particles.json"
                init={particlesInit}
                loaded={particlesLoaded}
              />
            </Content>
          </Layout>

          <Footer />
        </Layout>
      </Wrapper>
    </MetaMaskProvider>
  );
}

export default App;
