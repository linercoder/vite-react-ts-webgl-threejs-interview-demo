import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import './index.less'

const Home = () => {
  const nav = useNavigate();
  return (
    <>
    <Button type="dashed" onClick={()=>{nav('threejsDemo')}}>Threejs</Button>
    <Button type="dashed" onClick={()=>{nav('webgl2Demo')}}>Webgl</Button>
    <Outlet></Outlet>
    </>
  );
};

export default Home;
