import React from 'react';
import './Introduction.scss';

export const Introduction = ({name, urlLogo, description}) => {
  return (
    <div id='store-introduction'>
      <div style={{backgroundImage: `url(${urlLogo})`}}></div>
      <div className='introduction'>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}
