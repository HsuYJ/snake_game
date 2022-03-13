import Entity from './entity';

const Events = {
  GROW: 'GROW',
};

class Snake {
  /**
   * @type {Entity[]} from head to tail
   */
  body = [];

  moveDirection = [0, 0];

  static Events = Events;

  eventCallbacks = Object.keys(Events).reduce((callbacks, key) => {
    const callbacksRef = callbacks;

    callbacksRef[key] = null;

    return callbacksRef;
  }, {});

  /**
   *
   * @param {string} event
   * @param {Function} callback
   * @returns
   */
  watch (event, callback) {
    if (!Events[event]) {
      throw new Error(`No such event "${event}."`);
    }

    const { eventCallbacks } = this;

    eventCallbacks[event] = callback;

    const unwatch = () => {
      eventCallbacks[event] = null;
    };

    return unwatch;
  }

  /**
   *
   * @param {{
   *  position?: [number, number];
   *  size: number;
   * }} option
   */
  static create (option = {}) {
    const {
      position: [initX, initY] = [0, 0],
      size,
    } = option;
    const snake = new this();

    snake.body = Array.from({ length: size }, (value, index) => {
      const entity = Entity.create({ position: [initX, initY + index] });

      return entity;
    });

    return snake;
  }

  grow () {
    const { body, moveDirection } = this;
    const { position: headPosition } = body[0];
    const newHead = Entity.create({
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
