import React, { useContext, useEffect } from 'react';
import { Categories } from '../Components/Categories/Categories';
import { AuthContext } from '../Index';
import $ from 'jquery';

export const AllCategories = () => {
    const {tags} = useContext(AuthContext);

    useEffect(()=>{
        $(window).scrollTop('0')
    }, []);

  return (
    <div className='margin-padding-container'>
        <Categories tags={tags} url={"products"}></Categories>
    </div>
  )
}
