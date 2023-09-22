import React, { useState } from 'react';
import {FaBars} from  'react-icons/fa'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Header.scss';

export const Header = () => {
  const [showAside, setShowAside] = useState(false);

  const viewAside = ()=>{
    setShowAside(!showAside);
    if(showAside){
      $('#aside-content').addClass('hiddenAside');
      $('#aside-content').removeClass('showAside');
      $('#outlet-content').removeClass('goToRight');
      $('#outlet-content').addClass('goToLeft');
    }else{
      $('#aside-content').removeClass('hiddenAside');
      $('#aside-content').addClass('showAside');
      $('#outlet-content').addClass('goToRight');
      $('#outlet-content').removeClass('goToLeft');
    }
  }

  return (
    <div id='header-content'>
      <label title='Opciones' onClick={viewAside}>
        <FaBars></FaBars>
        Menú
      </label>
      <h1>
        <Link to={'/'} title='Página Principal'>Tienda.gt</Link>
      </h1>
    </div>
  )
}
