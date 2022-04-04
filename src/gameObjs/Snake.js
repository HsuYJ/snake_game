import Directions from '../enums/Directions';
import SnakeBody from './SnakeBody';

/**
 * @typedef {import('./GameObj').Position} Position
 * @typedef {[number, number]} Direction
 */

class Snake {
  /**
   * @type {SnakeBody[]} from head to tail
   */
  body = [];

  /**
   * @type {Direction}
   */
  nextDirection = Directions.UP;

  /**
   * @type {Direction}
   */
  direction = Directions.UP;

  isFruitEaten = false;

  /**
   *
   * @param {{
   *  position?: Position;
   *  size?: number;
   * }} option
   */
  static create (option = {}) {
    const {
      position: { x: initX, y: initY },
      size = 3,
    } = option;
    const snake = new this();

    snake.body = Array.from({ length: size }, (value, index) => {
      const entity = SnakeBody.create({
        position: { x: initX, y: initY + index },
      });

      return entity;
    });

    return snake;
  }

  getInfo () {
    return this.body.map(({ type, position }) => ({ type, ...position }));
  }

  /**
   *
   * @param {Direction} direction
   */
  setDirection (direction) {
    const [x, y] = direction;
    const { direction: [currentDirX, currentDirY] } = this;
    const isAccepted = ((x !== 0 && parseInt(x + currentDirX, 10) !== 0)
      || (y !== 0 && parseInt(y + currentDirY, 10) !== 0)
    );

    if (!isAccepted) {
      return;
    }

    this.nextDirection = direction;
  }

  eatFruit () {
    this.isFruitEaten = true;
  }

  move () {
    const { body, nextDirection, isFruitEaten } = this;
    const [x, y] = nextDirection;
    const { position: currentHeadPosition } = body[0];
    const tail = body[body.length - 1];
    const newHead = (isFruitEaten
      ? SnakeBody.create({ position: tail.position })
      : body.pop()
    );

    this.isFruitEaten = false;
    this.direction = nextDirection;

    newHead.moveTo({
      x: currentHeadPosition.x + x,
      y: currentHeadPosition.y + y,
    });
    body.unshift(newHead);
  }
}

export default Snake;
