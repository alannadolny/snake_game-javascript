import React, { useEffect, useRef, useState } from 'react';
import Field from './Field';
import Apple from '../snake/apple';
import { SPEED, BOARD_SIZE } from '../settings/config';
import GameStatus from './GameStatus';
import Points from './Points';

const Board = ({ snake }) => {
  const fields = Array.from(Array(BOARD_SIZE).keys());
  const [, forceRerender] = useState(0);
  const interval = useRef(null);
  const [direction, setDirection] = useState('ArrowRight');
  const [appleIndexes, setAppleIndexes] = useState({ x: null, y: null });
  const apple = new Apple();

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = null;
    document.addEventListener('keydown', (e) => {
      const turnDirection =
        e.key === 'ArrowRight' || e.key === 'ArrowLeft'
          ? 'horizontaly'
          : 'verticaly';
      if (snake.canChangeDirection(turnDirection)) setDirection(e.key);
    });
  }, []);

  useEffect(() => {
    interval.current = setInterval(() => {
      if (direction === 'ArrowRight') snake.goRight();
      if (direction === 'ArrowLeft') snake.goLeft();
      if (direction === 'ArrowUp') snake.goDown();
      if (direction === 'ArrowDown') snake.goUp();
      forceRerender((prev) => prev + 1);
    }, SPEED + snake.snake.length * -15);

    return () => clearInterval(interval.current);
  }, [interval.current, direction]);

  useEffect(() => {
    setAppleIndexes(apple.generateApple(snake.snake));
  }, []);

  useEffect(() => {
    if (
      appleIndexes.x === snake.snake[0].x &&
      appleIndexes.y === snake.snake[0].y
    ) {
      setAppleIndexes(apple.generateApple(snake.snake));
      snake.eatApple();
    }
  }, [snake.snake]);

  return (
    <div id='content'>
      <div>
        {!snake.activeGame ? (
          <GameStatus interval={interval} />
        ) : (
          <Points points={snake.snake.length - 1} />
        )}
      </div>
      <div id='board'>
        {' '}
        {snake?.snake &&
          fields.map((row) => (
            <div className='row' key={`row-${row}`}>
              {fields.map((col) => (
                <Field
                  key={`col-${col}`}
                  row={row}
                  col={col}
                  snake={snake}
                  appleIndexes={appleIndexes}
                  direction={direction}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
