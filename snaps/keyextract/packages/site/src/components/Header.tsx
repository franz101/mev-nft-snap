import { useContext } from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext, MetamaskState } from '../hooks';
import { connectSnap, isSnapInstalled } from '../utils';
import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

const ConnectButton = ({
  state,
  handleConnectClick,
}: {
  state: MetamaskState;
  handleConnectClick: () => Promise<void>;
}) => {
  if (!state.isFlask && !state.isSnapInstalled) {
    return (
      <Button
        icon={<FlaskFox />}
        type="ghost"
        // style={{ backgroundColor: 'lightgrey' }}
      >
        Install Flask
      </Button>
    );
  }

  if (!state.isSnapInstalled) {
    return (
      <Button icon={<FlaskFox />} type="ghost" onClick={handleConnectClick}>
        Connect
      </Button>
    );
  }

  return <Button icon={<ConnectedIndicator />}>Connected</Button>;
};

export const HeaderRow = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const snapInstalled = await isSnapInstalled();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: snapInstalled,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <Row>
      <Col span={2}>
        <Avatar
          src="/MEV_NFT_LOGO_SPARE.png"
          style={{ backgroundColor: 'white' }}
          shape="square"
        />
      </Col>

      <Col span={19}>MEV NFT</Col>
      <Col span={3}>
        <ConnectButton state={state} handleConnectClick={handleConnectClick} />
      </Col>
    </Row>

    // <HeaderWrapper>
    //   <LogoWrapper>
    //     <SnapLogo color={theme.colors.icon.default} size={36} />
    //     <Title>template-snap</Title>
    //   </LogoWrapper>
    //   <RightContainer>
    //     <Toggle
    //       onToggle={handleToggleClick}
    //       defaultChecked={getThemePreference()}
    //     />
    //     <HeaderButtons state={state} onConnectClick={handleConnectClick} />
    //   </RightContainer>
    // </HeaderWrapper>
  );
};
