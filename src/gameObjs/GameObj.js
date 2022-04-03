/**
 * @typedef {{
 *  x: number;
 *  y: number;
 * }} Position
 */

const positonKeys = ['x', 'y'];

class GameObj {
  type = 'gameObj';

  /**
   * @type {Position}
   */
  position = { x: 0, y: 0 };

  /**
   *
   * @param {{
   *  position?: {Position};
   * }} option
   */
  static create (option = {}) {
    const { position } = option;
    const gameobj = new this();

    if (position) {
      gameobj.position = position;
    }

    return gameobj;
  }

  /**
   *
   * @param {Position} delta
   */
  move (delta) {
    const { position } = this;

    positonKeys.forEach((key) => {
      position[key] = delta[key];
    });
  }

  /**
   *
   * @param {Position} position
   */
  moveTo (position) {
    this.position = position;
  }
}

export default GameObj;
