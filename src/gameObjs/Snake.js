import Directions from '../enums/Directions';
import SnakeBody from './SnakeBody';

/**
 * @typedef {import('./GameObj').Position} Position
 */

class Snake {
  /**
   * @type {SnakeBody[]} from head to tail
   */
  body = [];

  direction = Directions.UP;

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

  getBody () {
    return this.body.map(({ type, position }) => ({ type, ...position }));
  }

  grow () {
    const { body, moveDirection } = this;
    const { position: headPosition } = body[0];
    const newHead = SnakeBody.create({
      position: headPosition.map((pos, index) => pos + moveDirection[index]),
    });

    body.unshift(newHead);
  }

  move () {
    this.body.forEach((entity) => {

    });
  }
}

export default Snake;
