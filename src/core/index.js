import GameMap from './gameMap';
import Snake from './snake';

/**
 * @typedef {{}} BuildOptions
 */

class SnakeGame {
  /**
   * @type {GameMap}
   */
  gameMap;

  /**
   * @type {Snake}
   */
  snake;

  /**
   *
   * @param {BuildOptions} options
   * @returns
   */
  static create (options) {
    const game = new this();

    return game;
  }

  /**
   *
   * @param {{
   *  size: {
   *    width: number;
   *    height: number;
   *  };
   * }} options
   */
  createMap (options) {
    const {
      size,
    } = options;
    const gameMap = GameMap.create(size);

    this.gameMap = gameMap;
  }

  /**
   *
   * @param {number} size
   */
  createSnake (size) {
    this.snake = Snake.create({
      position: [5, 5],
      size,
    });
  }

  newGame () {
    this;
  }
}

export default SnakeGame;
