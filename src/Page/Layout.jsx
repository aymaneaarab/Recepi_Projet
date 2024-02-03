import React from 'react'
import { useSelector } from 'react-redux'
import ArRecipe from '../Components/ArRecipeLayout/ArRecipeLayout'
import LayoutRecipe from '../Components/LayoutRecipe'

export default function Layout() {
    const Langue = useSelector((state)=>state.Langue.choice)
  return (<div>

{Langue==='eng' ? <LayoutRecipe/> : <ArRecipe/> }
  </div>
  )
}
