import React from 'react';
import img from '../images/snake.png';

const Field = ({ row, col, snake, appleIndexes, direction }) => {
  const containsField = () => {
    for (const field of snake.snake) {
      if (field.x === row && field.y === col) return true;
    }
    return false;
  };

  const isLast = () => {
    return snake.snake[0].x === row && snake.snake[0].y === col;
  };

  const isHead = () => {
    return (
      snake.snake[snake.snake.length - 1].x === row &&
      snake.snake[snake.snake.length - 1].y === col
    );
  };

  const isTailTurnedRight = () => {
    return snake.snake.length > 1 && snake.snake[0].x >= snake.snake[1].x;
  };

  const isTailTurnedLeft = () => {
    return snake.snake.length > 1 && snake.snake[0].x <= snake.snake[1].x;
  };

  const isTailTurnedUp = () => {
    return snake.snake.length > 1 && snake.snake[0].y >= snake.snake[1].y;
  };

  const isTailTurnedDown = () => {
    return snake.snake.length > 1 && snake.snake[0].y <= snake.snake[1].y;
  };

  const headDirection = (dir) => {
    return direction === dir;
  };

  return (
    <div
      id='boardField'
      className={
        containsField()
          ? `snake head-${isHead()} tail-${isLast()} right-${
              !isTailTurnedRight() && isLast()
            } left-${!isTailTurnedLeft() && isLast()} up-${
              !isTailTurnedUp() && isLast()
            } down-${!isTailTurnedDown() && isLast()}`
          : appleIndexes.x === row && appleIndexes.y === col
          ? 'apple'
          : 'emptyField'
      }
    >
      {isHead() ? (
        <img
          className={`direction-down-${headDirection(
            'ArrowDown'
          )} direction-right-${headDirection(
            'ArrowRight'
          )} direction-left-${headDirection(
            'ArrowLeft'
          )} direction-up-${headDirection('ArrowUp')}`}
          src={img}
          alt='snake head'
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Field;
