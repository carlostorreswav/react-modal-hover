import * as React from 'react';

import { ModalHover } from '../lib/ModalHover';

import './styles.css';

function TestPage(): JSX.Element {
  return (
    <>
      <div className="TestPageMainDiv">
        <h1>react-modal-hover</h1>
        <hr />
      </div>

      <ModalHover
        onHover={(
          <h1>SHORT TEXT TEST</h1>
        )}
        logs
      >
        <h1 className="toHover1">Hover me!</h1>
      </ModalHover>

      <ModalHover
        onHover={(
          <h1>TEXT</h1>
        )}
        logs
      >
        <div className="toHover2">Hover me!</div>
      </ModalHover>

      <ModalHover
        onHover={(
          <h1>This is a very long text This is a very long text - This is a very long text This is a very long text - This is a very long text This is a very long text - This is a very long text This is a very long text - This is a very long text This is a very long text</h1>
        )}
        logs
      >
        <h1 className="toHover3">Hover me!</h1>
      </ModalHover>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      <ModalHover
        onHover={(
          <h1>This is normal text</h1>
        )}
        logs
      >
        <h1 className="toHover1">Hover me!</h1>
      </ModalHover>

      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      <ModalHover
        onHover={(
          <h1>This is a very long text This is a very long text This is a very long text This is a very long text This is a very long text</h1>
        )}
        logs
      >
        <h1 className="toHover1">Hover me!</h1>
      </ModalHover>
    </>
  )
};

export default TestPage;
