import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Index';
import { Introduction } from '../Components/Introduction/Introduction';
import { Categories } from '../Components/Categories/Categories';
import { AllProducts } from '../Components/Products/AllProducts';

export const HomePage = () => {
  
  return (
    <>
      <Introduction></Introduction>
      <Categories></Categories>
      <AllProducts></AllProducts>
    </>
  )
}
