import React from 'react';
import PatternDetail from '../PatternDetail/PatternDetail';
import PatternDirections from '../PatternDirections/PatternDirections';

export default function PatternPanel() {
    return (
      <div className="pattern-panel flex-container-column">
          <h2>Pattern Title</h2>
          <img src={require('../../Assets/SVG/placeholder-img.svg')} alt="placeholder"/>
          <div>Contributor Name</div>
          <PatternDetail />
          <PatternDirections />
      </div>
    )
  }

  