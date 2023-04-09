import React from 'react';
import './index.css';

import { Header } from './pages/components/header/Header';
import { Links } from './pages/components/links/Links';
import { Register } from './pages/RegisterSupplier/RegisterSupplier';
import { MainSupplier } from './pages/main_fornecedores/MainSupplier';
import { Categories } from './pages/categories/Categories';
 
function App() {
  return (
      <div>
        <Categories />
      </div>
  );
}

export default App;
