import { Home } from "./components/Home.tsx";
import { Loginscreen } from "./components/Loginscreen.tsx";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import userContext from "./contexts/UserContext.tsx";
import React, {useState} from 'react';




function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
  <userContext.Provider value={{ username, setUsername, password, setPassword }}>
    <Router>
      <Routes>
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/home" element={<Home></Home>} />
      </Routes>
    </Router>
  </userContext.Provider> 
  );
}

export default App;
