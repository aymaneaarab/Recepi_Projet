import React from 'react'
import withLoaderHOC from './withLoaderHOC';
import LayoutPrincipal from './LayoutPrincipal';
const LayoutwithLoader = withLoaderHOC(LayoutPrincipal);

export default function LayoutWithLoader() {
  return (
   <LayoutwithLoader/>
  )
}
