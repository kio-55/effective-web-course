import React from 'react';
import type { CardTypes } from '../../types/card';
import Card from '.';

const CardList: React.FC<CardTypes[]> = (cards) => {
  const printCards = () =>
    cards.map((card) => {
      <Card key={card.id} {...card}></Card>;
    });
  return <>printCards();</>;
};

export default CardList;
