/**
 * @typedef {{
 *  x: number;
 *  y: number;
 * }} Position
 */

const positonKeys = ['x', 'y'];

let sn = 0;
class GameObj {
  type = 'gameObj';

  id = `gb${sn += 1}`;

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

  getInfo () {
    return {
      id: this.id,
      type: this.type,
      ...this.position,
    };
  }

  /**
   *
   * @param {Position} delta
   */
  move (delta) {
    const { position } = this;

    positonKeys.forEach((key) => {
      position[key] += delta[key];
    });
  }

  /**
   *
   * @param {Position} position
   */
  moveTo (position) {
    const { x, y } = position;

    this.position = { x, y };
  }
}

export default GameObj;
