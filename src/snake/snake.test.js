const Snake = require('./snake');

let snake;

beforeEach(() => {
  snake = new Snake();
});

test('object initialization', () => {
  expect(snake.snake.length).toBe(1);
});

test('eating apple with length equals 1', () => {
  snake.eatApple();
  expect(snake.snake).toEqual([{ x: 0, y: 0, eaten: true }]);
});

test('going right with length equals 1', () => {
  snake.goRight();
  expect(snake.snake).toEqual([{ x: 1, y: 0 }]);
});

test('going left with length equals 1', () => {
  snake.goLeft();
  expect(snake.snake).toEqual([{ x: 9, y: 0 }]);
});

test('going up with length equals 1', () => {
  snake.goUp();
  expect(snake.snake).toEqual([{ x: 0, y: 1 }]);
});

test('going down with length equals 1', () => {
  snake.goDown();
  expect(snake.snake).toEqual([{ x: 0, y: 9 }]);
});

test('increasing size after eating apple', () => {
  snake.eatApple();
  snake.goRight();
  expect(snake.snake.length).toBe(2);
});

test('going right with length more than 1', () => {
  snake.eatApple();
  snake.goRight();
  expect(snake.snake).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
});

test('going left with length more than 1', () => {
  snake.eatApple();
  snake.goLeft();
  expect(snake.snake).toEqual([
    { x: 0, y: 0 },
    { x: 9, y: 0 },
  ]);
});

test('going down with length more than 1', () => {
  snake.eatApple();
  snake.goDown();
  expect(snake.snake).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 9 },
  ]);
});

test('going up with length more than 1', () => {
  snake.eatApple();
  snake.goUp();
  expect(snake.snake).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ]);
});

test('rotating multiple times', () => {
  snake.eatApple();
  snake.goDown();
  snake.eatApple();
  snake.goDown();
  snake.eatApple();
  snake.goRight();
  snake.goDown();
  snake.goLeft();
  expect(snake.snake).toEqual([
    { x: 0, y: 8 },
    { x: 1, y: 8 },
    { x: 1, y: 7 },
    { x: 0, y: 7 },
  ]);
});

test('if can change direction verticaly', () => {
  snake.eatApple();
  snake.goDown();
  expect(snake.canChangeDirection('verticaly')).toBeFalsy();
  expect(snake.canChangeDirection('horizontaly')).toBeTruthy();
});

test('if can change direction horizontaly', () => {
  snake.eatApple();
  snake.goRight();
  expect(snake.canChangeDirection('verticaly')).toBeTruthy();
  expect(snake.canChangeDirection('horizontaly')).toBeFalsy();
});

test('reset snake', () => {
  snake.eatApple();
  snake.goRight();
  snake.resetSnake();
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
  expect(snake.activeGame).toBeTruthy();
});

test('cross right border', () => {
  for (let i = 0; i < 10; i++) {
    snake.goRight();
  }
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('cross left border', () => {
  snake.goLeft();
  expect(snake.snake).toEqual([{ x: 9, y: 0 }]);
});

test('cross top border', () => {
  for (let i = 0; i <= 10; i++) {
    snake.goUp();
  }
  expect(snake.snake).toEqual([{ x: 0, y: 1 }]);
});

test('cross bottom border', () => {
  for (let i = 0; i < 10; i++) {
    snake.goDown();
  }
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('move left when the game is over', () => {
  snake.activeGame = false;
  snake.goLeft();
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('move right when the game is over', () => {
  snake.activeGame = false;
  snake.goRight();
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('move down when the game is over', () => {
  snake.activeGame = false;
  snake.goDown();
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('move up when the game is over', () => {
  snake.activeGame = false;
  snake.goUp();
  expect(snake.snake).toEqual([{ x: 0, y: 0 }]);
});

test('game over when snake bites himself', () => {
  snake.snake = [
    { x: 1, y: 1 },
    { x: 1, y: 1 },
  ];
  expect(snake.activeGame).toBeTruthy();
  snake.checkGamerOver();
  expect(snake.activeGame).toBeFalsy();
});

test('can change direction if length of the snake is 1', () => {
  snake.goRight();
  expect(snake.canChangeDirection('horizontaly')).toBeTruthy();
});
