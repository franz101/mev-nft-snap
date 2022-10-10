import { Row, Col, Button, Layout } from 'antd';
import { ReactComponent as QuickNode } from '../assets/qn-logo.svg';
import { ReactComponent as CoinBase } from '../assets/cb-logo.svg';
import { ReactComponent as Sozu } from '../assets/sozuLogo.svg';
import { MetaMask } from './MetaMask';
import { PoweredBy } from './PoweredBy';

export const Footer = () => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: '#141414',
        zIndex: 1,
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
      }}
    >
      <Row justify="space-around" style={{ paddingBottom: '20px' }}>
        <PoweredBy color="white" />
      </Row>
      <Row justify="space-around">
        <Col>
          <Button size="large" style={{ width: '100%', height: '60px' }}>
            <MetaMask color="orange" />
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            style={{ height: '60px', width: '100%' }}
            icon={<QuickNode style={{ height: '30px' }} />}
          ></Button>
        </Col>
        <Col>
          <Button
            size="large"
            style={{ height: '60px', width: '100%', minWidth: '200px' }}
            icon={<CoinBase style={{ height: '24px' }} />}
          ></Button>
        </Col>
        <Col>
          <Button
            size="large"
            style={{ height: '60px', width: '200px' }}
            icon={<Sozu style={{ height: '30px', width: '50px' }} />}
          ></Button>
        </Col>
      </Row>
    </Layout.Footer>
  );
};
