import { useContext } from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { MetamaskActions, MetaMaskContext, MetamaskState } from '../hooks';
import { connectSnap, isSnapInstalled } from '../utils';
import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';

const ConnectButton = ({
  state,
  handleConnectClick,
}: {
  state: MetamaskState;
  handleConnectClick: () => Promise<void>;
}) => {
  console.log(state);
  if (!state.isFlask && !state.isSnapInstalled) {
    return (
      <Button icon={<FlaskFox />} type="ghost">
        Install Flask
      </Button>
    );
  }

  if (!state.isSnapInstalled) {
    return (
      <Button type="ghost" onClick={handleConnectClick}>
        Connect <FlaskFox />
      </Button>
    );
  }

  return (
    <Button icon={<CheckCircleOutlined />} disabled>
      Connected
    </Button>
  );
};

export const HeaderRow = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      await isSnapInstalled();
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: { snapInstalled: true }, // TODO: check if snap is installed
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <Row>
      <Col span={1}>
        <Avatar
          src="/MEV_NFT_LOGO_SPARE.png"
          style={{ backgroundColor: 'white' }}
          shape="square"
        />
      </Col>

      <Col span={21}>MEV NFT</Col>
      <Col span={2} style={{ paddingTop: '2px' }}>
        <ConnectButton state={state} handleConnectClick={handleConnectClick} />
      </Col>
    </Row>
  );
};
