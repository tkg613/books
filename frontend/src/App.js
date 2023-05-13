import {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {

  return (
    <>
    <Router>
      <Navbar />
        <Routes>

          <Route path='/' element={<Landing />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>

        </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
