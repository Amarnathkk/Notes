import Home from "./pages/Home"
import Signup from "./pages/Signup"
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />




      </Routes>

    </>
  )
}

export default App
