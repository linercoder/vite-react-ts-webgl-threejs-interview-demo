import { useEffect, useRef } from 'react';
import './index.less'


const Webgl2Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
  }, []);
  return(<>
  <canvas ref={canvasRef}></canvas>
  </>)
}

export default Webgl2Canvas;
