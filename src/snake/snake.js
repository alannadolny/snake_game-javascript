const { BOARD_SIZE } = require('../settings/config');

class Snake {
  constructor() {
    this.snake = [{ x: 0, y: 0 }];
    this.activeGame = true;
  }

  goRight() {
    if (!this.activeGame) return;
    const { x, y } = this.snake[this.snake.length - 1];
    if (this.snake[0].eaten) {
      this.snake = [
        { x: this.snake[0].x, y: this.snake[0].y },
        ...this.snake.slice(1),
        { x: x + 1, y },
      ];
    } else this.snake = [...this.snake.slice(1), { x: x + 1, y }];
    this.afterMove();
  }

  goLeft() {
    if (!this.activeGame) return;
    const { x, y } = this.snake[this.snake.length - 1];
    if (this.snake[0].eaten) {
      this.snake = [
        { x: this.snake[0].x, y: this.snake[0].y },
        ...this.snake.slice(1),
        { x: x - 1, y },
      ];
    } else this.snake = [...this.snake.slice(1), { x: x - 1, y }];
    this.afterMove();
  }

  goUp() {
    if (!this.activeGame) return;
    const { x, y } = this.snake[this.snake.length - 1];
    if (this.snake[0].eaten) {
      this.snake = [
        { x: this.snake[0].x, y: this.snake[0].y },
        ...this.snake.slice(1),
        { x, y: y + 1 },
      ];
    } else this.snake = [...this.snake.slice(1), { x, y: y + 1 }];
    this.afterMove();
  }

  goDown() {
    if (!this.activeGame) return;
    const { x, y } = this.snake[this.snake.length - 1];
    if (this.snake[0].eaten) {
      this.snake = [
        { x: this.snake[0].x, y: this.snake[0].y },
        ...this.snake.slice(1),
        { x, y: y - 1 },
      ];
    } else this.snake = [...this.snake.slice(1), { x, y: y - 1 }];
    this.afterMove();
  }

  eatApple() {
    const [head, ...tail] = this.snake;
    this.snake = [{ ...head, eaten: true }, ...tail];
  }

  resetSnake() {
    this.snake = [{ x: 0, y: 0 }];
    this.activeGame = true;
  }

  canChangeDirection(direction) {
    if (this.snake.length === 1) return true;
    if (
      direction === 'verticaly' &&
      this.snake[this.snake.length - 2].x ===
        this.snake[this.snake.length - 1].x
    )
      return false;
    if (
      direction === 'horizontaly' &&
      this.snake[this.snake.length - 2].y ===
        this.snake[this.snake.length - 1].y
    )
      return false;
    return true;
  }

  checkGamerOver() {
    const head = this.snake[this.snake.length - 1];
    const tail = this.snake.slice(0, -1);
    for (const field of tail) {
      if (head.x === field.x && head.y === field.y) this.activeGame = false;
    }
  }

  afterMove() {
    this.crossBorder();
    this.checkGamerOver();
  }

  crossBorder() {
    const head = this.snake[this.snake.length - 1];
    if (head.x < 0)
      this.snake = [
        ...this.snake.slice(0, -1),
        { x: BOARD_SIZE - 1, y: head.y },
      ];
    if (head.y < 0)
      this.snake = [
        ...this.snake.slice(0, -1),
        { x: head.x, y: BOARD_SIZE - 1 },
      ];
    if (head.x > BOARD_SIZE - 1)
      this.snake = [...this.snake.slice(0, -1), { x: 0, y: head.y }];
    if (head.y > BOARD_SIZE - 1)
      this.snake = [...this.snake.slice(0, -1), { x: head.x, y: 0 }];
  }
}

module.exports = Snake;
