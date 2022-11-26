import React from 'react';
import type { CardTypes } from '../../types/card';

const Card: React.FC<CardTypes> = ({ id, imageUrl, title, description }) => {
  return (
    <div>
      <img src={imageUrl} alt="" />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Card;
