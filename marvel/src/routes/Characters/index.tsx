import React, { useEffect, useState } from 'react';

import CardList from '../../components/Card/CardList';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState();

  useEffect(
    () => {
      fetch('/assets/characters.json').then(async (response) => {
        const res = await response;
        console.log(res);
      })
    }
    ,[]
  )
  return (
    <div>
      <header>
        <h1>Characters</h1>
        <span>(1562)</span>
        <input type="text" />
        <button>search</button>
        <CardList></CardList>
      </header>
    </div>
  );
};

export default Characters;
