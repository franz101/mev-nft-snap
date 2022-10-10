import './App.css';
import { Divider, Layout } from 'antd';
import styled from 'styled-components';
import { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { MetaMaskProvider } from './hooks';
import { HeaderRow } from './components/Header';
import { Footer } from './components/Footer';
import Content from './components/Content';
const { Header } = Layout;

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
            <Content />
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
