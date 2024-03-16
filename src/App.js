import React from 'react';
import './App.css';
import Homepage from './Test/HomePage';
import { Route, Routes } from 'react-router';
import LayoutWithLoader from './Page/LayoutwithLoader';

function App() {
  return (
 <Routes>
  <Route index element={<Homepage/>}/>
  <Route path='search' element={<LayoutWithLoader/>}/>
 </Routes>
)

}

export default App;
