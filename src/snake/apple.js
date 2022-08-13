const { BOARD_SIZE } = require('../settings/config');

class Apple {
  generateApple(snake) {
    let indexes = { x: null, y: null };
    while (indexes.x === null) {
      indexes = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      let collision = false;
      for (const field of snake) {
        if (field.x === indexes.x && field.y === indexes.y) {
          collision = true;
        }
      }
      if (!collision) break;
    }
    return indexes;
  }
}

module.exports = Apple;
