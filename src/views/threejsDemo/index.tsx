import { demo1 } from '@/threejs/demo1';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './index.less'


const ThreejsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    demo1(canvasRef.current);
  }, []);
  return(<>
    <canvas ref={canvasRef}></canvas>
  </>)
}

export default ThreejsCanvas;
