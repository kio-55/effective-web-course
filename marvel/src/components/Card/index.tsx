import React from 'react';
import type { CardTypes } from '../../types/card';
import { Card } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Meta } = Card;

const CardItem: React.FC<CardTypes> = ({
  id,
  imageUrl,
  title,
  description
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      hoverable
      style={{ width: 240 }}
      size="small"
      cover={<img alt="example" src={imageUrl} />}
    >
      <Meta title={title} description={description} style={{ height: 140 }} />
    </Card>
  );
};

export default CardItem;
