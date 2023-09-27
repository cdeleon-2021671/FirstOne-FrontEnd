import React from 'react';
import './Introduction.scss';

export const Introduction = ({name, urlLogo, description}) => {
  return (
    <div id='store-introduction'>
      <div style={{backgroundImage: `url(${urlLogo})`}}></div>
      <div className='introduction'>
        <h1 itemprop="name">{name}</h1>
        <p itemprop="description">{description}</p>
      </div>
    </div>
  )
}
