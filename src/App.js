import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cards from './cards';
import CustomizeStore from './customizeStore';
import ProductForm from './productForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/customizeStore" element={<CustomizeStore />} />
        <Route path="/productForm" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
