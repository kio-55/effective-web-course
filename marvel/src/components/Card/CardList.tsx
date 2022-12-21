import React from 'react';
import type { CardTypes } from '../../types/card';
import CardItem from '.';
import styles from './Card.module.css';
import LoadingCard from './LoadingCard';
import favsStore from 'stores/FavsStore';

interface Props {
  cards: CardTypes[];
  loading: boolean;
}

const CardList: React.FC<Props> = ({ cards, loading }: Props) => {
  const arr = Object.values(cards);
  favsStore.getAllFavs();
  return (
    <div className={styles.list}>
      {loading
        ? Array(10).fill(<LoadingCard></LoadingCard>)
        : arr.map((card) => {
            return <CardItem key={card.id} {...card}></CardItem>;
          })}
    </div>
  );
};

export default CardList;
