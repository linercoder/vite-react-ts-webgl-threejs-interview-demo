import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function demo1(canvasRef:HTMLCanvasElement|null) {
  console.log('加载Threejs');
  if (!canvasRef) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.rotateX(-0.3);
    const renderer = new THREE.WebGLRenderer({canvas:canvasRef});
    renderer.setSize(window.innerWidth, window.innerHeight);
    const orbitControls = new OrbitControls(camera, canvasRef);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const axisHelper = new THREE.AxesHelper(2)
    scene.add(axisHelper)

    var gridHelper = new THREE.GridHelper( 100, 30, 0x2C2C2C, 0x888888 );
    scene.add(gridHelper);

    const light = new THREE.AmbientLight('blue');  //蓝色
    scene.add(light)

    const loader1 = new FBXLoader();
    loader1.load(
      '../../src/assets/3d-models/SciFiHallway.fbx',
      (object) => {
      scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred', error);
      });

    const loader2 = new FBXLoader();
    loader2.load(
      '../../src/assets/3d-models/Theoldfactory.fbx',
      (object) => {
      scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred', error);
      });
    const loader3 = new FBXLoader();
    loader3.load(
      '../../src/assets/3d-models/Theoldfactory.fbx',
      (object) => {
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred', error);
      });



    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
}
