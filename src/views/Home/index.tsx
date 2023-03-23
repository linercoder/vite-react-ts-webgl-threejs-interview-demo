import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Home = () => {
  const canvasRef = useRef();

  useEffect(()=>{
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({canvas});
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    function animate(){
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  },[])

  return (
    <>
    <div>
      <canvas ref={canvasRef}>
      </canvas>
    </div>
    </>
  );
};

export default Home;
