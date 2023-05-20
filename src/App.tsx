import Calculator from './Calculator';
import CalculatorHome from './CalculatorHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { useState } from 'react';

function App() {
  const [name, setName] = useState<string>('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalculatorHome name = {name} setName = {setName}/>} />
        <Route path="/calculator" element={<Calculator name={name} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
