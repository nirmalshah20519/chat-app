import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing';
import PageNotFound from './pages/PageNotFound'; // Import the PageNotFound component
import Account from './pages/Account';
import Requests from './pages/Requests';

const App = () => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <div>
        {/* ToastContainer added to enable toast messages */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home changeAuth={setAuth} auth={auth} />} />
          {auth && (
            <>
              <Route path="/home" element={<Landing changeAuth={setAuth} auth={auth} />} />
              <Route path="/account" element={<Account changeAuth={setAuth} auth={auth} />} />
              <Route path="/requests" element={<Requests changeAuth={setAuth} auth={auth} />} />
            </>
          )}
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
