import React, { useState } from 'react';
import Register from '../components/Register';
import Navbar from '../components/Navbar';
import Login from '../components/Login';

export default function Home({changeAuth, auth}) {
  const [login, setLogin] = useState(true);

  return (
    <>
      <Navbar switchFn={setLogin} auth={auth}/>
      <div className="flex items-center justify-center h-[70vh]">
        {login ? <Login changeAuth={changeAuth} switchFn={setLogin} /> : <Register switchFn={setLogin} />}
      </div>
    </>
  );
}
