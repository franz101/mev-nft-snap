import './App.css';
// import { useContext } from 'react';
import { UnlockOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Layout, Result, Row } from 'antd';
import styled from 'styled-components';
import { MetaMaskProvider } from './hooks';
import { HeaderRow } from './components/Header';
import { ReactComponent as MetaMaskFox } from './assets/metamask_fox.svg';

const { Header, Content, Footer } = Layout;
// const { Title } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

function App() {
  // const [state, dispatch] = useContext(MetaMaskContext);

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
                  <Button type="primary" key="console">
                    Install
                  </Button>,
                  // <Button key="buy">Buy Again</Button>,
                ]}
              />
            </Content>
          </Layout>

          <Footer>
            <Row justify="space-around">
              <Col>
                <Button
                  size="large"
                  style={{ width: '260px', height: '70px' }}
                  icon={<MetaMaskFox />}
                >
                  Powered by MetaMask
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  style={{ height: '70px' }}
                  icon={<MetaMaskFox />}
                >
                  QuickNode
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  style={{ height: '70px' }}
                  icon={<MetaMaskFox />}
                >
                  Coinbase Cloud
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  style={{ height: '70px' }}
                  icon={<MetaMaskFox />}
                >
                  Gnosis Chain
                </Button>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Wrapper>
    </MetaMaskProvider>
  );
}

export default App;
