import React from 'react';
import './App.css';
import Homepage from './Test/HomePage';
import LayoutRecipe from './Components/LayoutRecipe';
import { Route, Routes } from 'react-router';
import ArRecipe from './Components/ArRecipeLayout/ArRecipeLayout';
import withLoaderHOC from './Page/withLoaderHOC';
import LayoutPrincipal from './Page/LayoutPrincipal';
const LayoutwithLoader = withLoaderHOC(LayoutPrincipal);

function App() {
  return (
  <div>

<LayoutPrincipal/>
{/* <LayoutwithLoader/> */}
  </div>
)

}

export default App;
