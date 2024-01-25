import React from 'react';
import './App.css';
import Homepage from './Test/HomePage';
import LayoutRecipe from './Components/LayoutRecipe';
import ArRecipe from './Components/ArRecipeLayout';
import { Route, Routes } from 'react-router';



function App() {
  return (
<Routes>
  <Route index element={<Homepage/>} />
  <Route path='search' element ={<LayoutRecipe/>} />
  <Route path='searchAr' element={<ArRecipe/>}/>
</Routes>
  );
}

export default App;
