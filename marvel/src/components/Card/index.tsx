import React from 'react';
import type { CardTypes } from '../../types/card';
import { Card } from 'antd';

const { Meta } = Card;

const CardItem: React.FC<CardTypes> = ({
  id,
  imageUrl,
  title,
  description
}) => {
  return (
    <Card
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
