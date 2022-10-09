import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import Logo from './../../containers/Logo';
const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            maxWidth: '350px',
            maxHeight: '350px',
            width: '100%',
            height: '100%',
          }}
        >
          <Logo />
        </div>
        <p>Sign up for a demo</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <input
          style={{ height: '30px', width: '150px' }}
          placeholder="E-Mail..."
        ></input>
      </header>
    </div>
  );
};

export default Newtab;
