import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  PointerEvents,
  XR,
  XRDomOverlay,
  XROrigin,
  createXRStore,
  noEvents,
  useXR,
} from '@react-three/xr';
import * as THREE from 'three';

import {
  Container,
  DefaultProperties,
  Root,
  Text,
} from '@react-three/uikit';
import { Button, Defaults } from '@react-three/uikit-default';
import { Environment } from '@react-three/drei';

// XR store
const store = createXRStore();

function FloatingPrompt() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      const distance = 1.2;

      // Place prompt in front of the camera
      const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const position = camera.position.clone().add(direction.multiplyScalar(distance));
      groupRef.current.position.lerp(position, 0.15);

      // Rotate to fully face camera (preserve up vector)
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <Defaults>
        <Root
          anchorY="bottom"
          width={100}
          height={50}
          pixelSize={0.005}
          flexDirection="column"
        >
          <Container
            padding={0.05}
            borderRadius={0.05}
            backgroundColor="black"
            width="100%"
            height="100%"
            flexDirection="row"
            gap={0.01}
            alignItems="center"
            justifyContent="space-between"
            borderWidth={0.01}
            borderColor="#555"
          >
            <Text color="#fff" fontSize={10} fontWeight="bold">
              Ask Something...
            </Text>
            <Button
              backgroundColor="#444"
              width={30}
              borderRadius={0.025}
              padding={0.02}
              onClick={() => console.log('Mic clicked')}
            >
              <Text color="#fff" fontSize={30}>Speak</Text>
            </Button>
          </Container>
        </Root>
      </Defaults>
    </group>
  );
}

function NonAREnvironment() {
  const inAR = useXR((s) => s.mode === 'immersive-ar');
  return (
    <Environment
      blur={0.2}
      background={!inAR}
      environmentIntensity={2}
      preset="city"
    />
  );
}

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
  return (
    <>
      <EnterExitXRButton />

      <Canvas
        events={noEvents}
        gl={{ localClippingEnabled: true }}
        style={{ width: '100%', height: 'auto', flexGrow: 1 }}
        camera={{ position: [0, 0, 0.65] }}
      >
        <PointerEvents batchEvents={false} />
        <XR store={store}>
          <NonAREnvironment />
      
          <FloatingPrompt />
    
        </XR>
      </Canvas>
    </>
  );
}
