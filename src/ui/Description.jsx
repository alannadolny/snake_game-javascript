import React from 'react';
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from 'react-icons/bs';

const Description = ({ snake }) => {
  return (
    <div id='description'>
      <div>
        {' '}
        <h1>Snake game</h1>
        <h2>Try to eat as many apples as you can!</h2>
        <h4>Controls:</h4>
        <div>
          <div>
            <BsFillArrowUpSquareFill size='2em' />
            <small>up</small>
          </div>
          <div>
            <BsFillArrowDownSquareFill size='2em' />
            <small>down</small>
          </div>
          <div>
            <BsFillArrowRightSquareFill size='2em' />
            <small>right</small>
          </div>
          <div>
            <BsFillArrowLeftSquareFill size='2em' />
            <small>left</small>
          </div>
        </div>
      </div>

      <div id='button'>
        <button onClick={() => snake.resetSnake()}>Start a new game</button>
      </div>
    </div>
  );
};

export default Description;
