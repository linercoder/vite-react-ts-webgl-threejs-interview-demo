import { BrowserRouter } from 'react-router-dom';

import Router from '@/routers';

function App() {
  const basename = import.meta.env.PROD ? '/operation-admin' : '/';
  console.log(' import.meta.env.MODE: ', import.meta.env.MODE);
  return (
    <>
      <BrowserRouter basename={basename}>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
