/**
 * @typedef {[number, number]} BodyPosition
 */

class Entity {
  position = [0, 0];

  /**
   *
   * @param {{
   *  position?: [number, number];
   * }} option
   */
  static create (option = {}) {
    const {
      position,
    } = option;
    const entity = new this();

    if (position) {
      entity.position = position;
    }

    return entity;
  }

  /**
   *
   * @param {number} deltaX
   * @param {number} deltaY
   */
  move (deltaX, deltaY) {
    const { position } = this;

    position[0] += deltaX;
    position[1] += deltaY;
  }
}

export default Entity;
