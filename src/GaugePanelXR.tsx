import { useRef } from 'react';
import { Container, Root } from '@react-three/uikit';
import { Defaults } from '@react-three/uikit-default';
import ChartCanvas from './ChartCanvas';
import { ChartTexture } from './ChartTexture';

export default function GaugePanel(canvasRef) {
  return (
    <>
      <Defaults>
        <Root pixelSize={0.0025} anchorY="middle">
          <Container
            width={300}
            height={300}
            borderRadius={16}
            padding={12}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          
          >
            {/* Canvas chart texture rendered in 3D */}
            <ChartTexture canvasRef={canvasRef} />
          </Container>
        </Root>
      </Defaults>
    </>
  );
}
