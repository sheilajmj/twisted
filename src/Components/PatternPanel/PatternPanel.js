import React from 'react';
import PatternDetail from '../PatternDetail/PatternDetail';
import PatternDirections from '../PatternDirections/PatternDirections';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import CommentPanel from '../CommentPanel/CommentPanel';

export default function PatternPanel() {
    return (
      <div className="pattern-panel flex-container-column">
          <h2>Pattern Title</h2>
          <FavoriteIcon />
          <img src={require('../../Assets/SVG/placeholder-img.svg')} alt="placeholder"/>
          <div>Contributor Name</div>
          <PatternDetail />
          <PatternDirections />
          <CommentPanel />
      </div>
    )
  }

  