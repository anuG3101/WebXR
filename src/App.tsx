// App.tsx
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore, PointerEvents } from '@react-three/xr';
import ChartCanvas from './ChartCanvas';
import { ChartTexture } from './ChartTexture';
import GaugePanel from './GaugePanelXR';
import { Defaults } from '@react-three/uikit-default';
import { Container, Root } from '@react-three/uikit';

const store = createXRStore();



function EnterExitXRButton() {
  const [entered, setEntered] = useState(false);

  const toggleSession = () => {
    if (!entered) {
      store.enterXR('immersive-ar');
    } else {
      store.destroy();
    }
    setEntered(!entered);
  };

  return (
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
      <button
        onClick={toggleSession}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '10px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {entered ? 'Exit AR' : 'Enter XR'}
      </button>
    </div>
  );
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <EnterExitXRButton />


      <ChartCanvas ref={canvasRef} />

      <Canvas camera={{ position: [0, 1.6, 3] }}>
        <ambientLight />
        <PointerEvents />
        <XR store={store}>
          <ChartTexture canvasRef={canvasRef} />

        </XR>
      </Canvas>
    </>
  );
}
