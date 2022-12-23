import React, { useState } from 'react';
import type { CardTypes } from '../../types/card';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import favsStore from 'stores/FavsStore';

const { Meta } = Card;

const CardItem: React.FC<CardTypes> = ({
  id,
  imageUrl,
  title,
  description,
  page
}) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(favsStore.isLiked(id.toString(), page));

  const handleClick = () => {
    navigate(`/${page}/${id}`);
  };

  const onClick = () => {
    setLiked((prevState) => !prevState);
    if (liked) {
      favsStore.removeFavById(id.toString(), page);
    } else {
      favsStore.appendFavById(id.toString(), page);
    }
  };

  return (
    <div className={styles.card}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="64px"
        height="64px"
        viewBox="0 0 64 64"
        enableBackground="new 0 0 64 64"
        xmlSpace="preserve"
        className={liked ? styles.liked : styles.simple}
        onClick={onClick}
      >
        <g id="Rounded_Rectangle_252">
          <g>
            <path
              fill="#F26C6D"
              d="M46,5c-6.838,0-11,5-11,5c-2.744,4.015-3.695,3.482-6,0c0,0-5.005-5-11-5C7.425,5,1,15.242,1,23.323
			c0,17.003,20.092,30.345,31.001,35.665C42.896,53.675,63,41.059,63,23.323C63,15.242,55.689,5,46,5z"
            />
          </g>
        </g>
        <g id="Ellipse_26">
          <g>
            <path
              fill="#2B3139"
              d="M46,4c-5.658,0-10.7,3.464-14,8c-3.3-4.536-8.342-8-14-8C8.059,4,0,12.954,0,24c0,22.875,32,36,32,36
			s32-13.125,32-36C64,12.954,55.941,4,46,4z M32.001,57.999C21.442,52.763,1.995,40.788,1.995,24.054
			c0-8.628,5.767-18.038,16.003-18.038c7.535,0,11.73,6.321,12.696,7.793c0.597,1.119,1.365,1.504,2.35,0.345
			C34.374,12.451,38.993,6,46,6l0.002,0.016c9.379,0,16.003,8.903,16.003,18.038C62.005,41.509,42.547,52.77,32.001,57.999z M46,8
			c-0.553,0-1,0.447-1,1s0.447,1,1,1c6.627,0,12,6.268,12,14c0,0.553,0.447,1,1,1s1-0.447,1-1C60,15.163,53.732,8,46,8z
			 M29.288,15.246C26.75,11.133,22.658,8,18,8c-0.553,0-1,0.447-1,1s0.447,1,1,1c3.786,0,7.379,2.698,9.571,6.275
			c0.035,0.057,0.067,0.084,0.099,0.092c0.184,0.228,0.452,0.383,0.768,0.383c0.553,0,1-0.447,1-1c0-0.179-0.06-0.338-0.142-0.483
			C29.291,15.258,29.294,15.255,29.288,15.246z"
            />
          </g>
        </g>
      </svg>

      <Card
        onClick={handleClick}
        hoverable
        style={{ width: 240, height: 400 }}
        size="small"
        cover={<img className={styles.image} alt="example" src={imageUrl} />}
      >
        <Meta title={title} description={description} style={{ height: 140 }} />
      </Card>
    </div>
  );
};

export default CardItem;
