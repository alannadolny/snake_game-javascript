import React, { useEffect } from 'react';

const GameStatus = (interval) => {
  useEffect(() => {
    clearInterval(interval);
  }, []);

  return <div id='status'>You lose!</div>;
};

export default GameStatus;
