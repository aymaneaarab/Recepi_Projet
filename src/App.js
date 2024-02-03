import React from 'react';
import './App.css';
import Homepage from './Test/HomePage';
import LayoutRecipe from './Components/LayoutRecipe';
import { Route, Routes } from 'react-router';
import ArRecipe from './Components/ArRecipeLayout/ArRecipeLayout';
import LayoutWithLoader from './Page/LayoutwithLoader';
// import withLoaderHOC from './Page/withLoaderHOC';
// import LayoutPrincipal from './Page/LayoutPrincipal';
// const LayoutwithLoader = withLoaderHOC(LayoutPrincipal);

function App() {
  return (
 <Routes>
  <Route index element={<Homepage/>}/>
  <Route path='search' element={<LayoutWithLoader/>}/>
 </Routes>
)

}

export default App;
