import React from 'react';
import type { CardTypes } from '../../types/card';
import CardItem from '.';
import styles from './Card.module.css';

const CardList: React.FC<CardTypes[]> = (cards) => {
  cards = Object.values(cards);
  return (
    <div className={styles.list}>
      {cards.map((card) => {
        return <CardItem key={card.id} {...card}></CardItem>;
      })}
    </div>
  );
};

export default CardList;
