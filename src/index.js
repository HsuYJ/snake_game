import Events from './enums/Events';
import GameMap from './gameMap';
import Snake from './gameObjs/Snake';

export { default as Directions } from './enums/Directions';
export { default as GameObjTypes } from './enums/GameObjTypes';
export { Events };

/**
 * @typedef {import('./gameMap').MapData} MapData
 */

const SnakeGame = {
  /**
   * @type {Object<string, Set<Function>>}
   */
  eventCallbacks: {
    [Events.INIT]: new Set(),
  },

  /**
   *
   * @param {MapData} mapData
   */
  setup (mapData) {
    const gameMap = GameMap.create(mapData);
    const snake = gameMap.snake.getBody();
    const eventName = Events.INIT;
    const eventCallbacks = this.eventCallbacks[eventName];

    eventCallbacks.forEach((callback) => {
      callback({
        eventName,
        data: {
          snake,
        },
      });
    });
  },

  /**
   *
   * @param {string} event
   * @param {Function} callback
   * @param {{ once: boolean }?} option
   */
  on (event, callback, option) {
    const eventCallbacks = this.eventCallbacks[event];
    let usedCallback = callback;
    const off = () => {
      eventCallbacks.delete(usedCallback);
    };

    if (option?.once) {
      usedCallback = (...args) => {
        off();
        callback(...args);
      };
    }

    eventCallbacks.add(usedCallback);

    return off;
  },
};

export default SnakeGame;
