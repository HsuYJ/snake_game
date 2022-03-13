import GameMap from './gameMap';

/**
 * @typedef {{}} BuildOptions
 */

class SnakeGame {
  /**
   * @type {GameMap}
   */
  gameMap;

  /**
   *
   * @param {BuildOptions} options
   * @returns
   */
  static create (options) {
    return new this(options);
  }

  newGame () {
    this;
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
    const gameMap = new GameMap(size);

    this.gameMap = gameMap;
  }
}

export default SnakeGame;
