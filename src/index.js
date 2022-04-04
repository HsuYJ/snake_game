import GameObjTypes from './enums/GameObjTypes';
import Events from './enums/Events';
import GameMap from './gameMap';
import Fruit from './gameObjs/Fruit';

export { default as Directions } from './enums/Directions';
export { default as GameObjTypes } from './enums/GameObjTypes';
export { Events };

/**
 * @typedef {import('./gameMap').MapData} MapData
 * @typedef {import('./gameObjs/Snake').Direction} Direction
 */

function update () {

}

class SnakeGame {
  /**
   * @type {Object<string, Set<Function>>}
   */
  eventCallbacks = {
    [Events.INIT]: new Set(),
    [Events.SNAKE_MOVE]: new Set(),
    [Events.UPDATE]: new Set(),
    [Events.DROP_FRUIT]: new Set(),
  };

  static create () {
    const game = new this();

    return game;
  }

  /**
   *
   * @param {MapData} mapData
   */
  setup (mapData) {
    const gameMap = GameMap.create(mapData);
    const snake = gameMap.snake.getInfo();

    this.gameMap = gameMap;

    const eventName = Events.INIT;
    const eventCallbacks = this.eventCallbacks[eventName];

    eventCallbacks.forEach((callback) => {
      callback({
        eventName,
        data: {
          snake,
          gameMap: gameMap.getInfo(),
        },
      });
    });
  }

  /**
   * @type {Fruit}
   */
  #fruit = null;

  #dropFruit () {
    const fruit = this.gameMap.dropFruit();

    this.#fruit = fruit;

    const eventName = Events.DROP_FRUIT;
    const eventCallbacks = this.eventCallbacks[eventName];

    eventCallbacks.forEach((callback) => {
      callback({
        eventName,
        data: {
          fruit: fruit.getInfo(),
        },
      });
    });
  }

  #checkFruitEating () {
    const { gameMap } = this;
    const [{ position: headPosition }] = gameMap.snake.body;
    const fruit = this.#fruit;
    const { position: fruitPosition } = fruit;
    const isFruitEaten = (headPosition.x === fruitPosition.x
      && headPosition.y === fruitPosition.y
    );

    return isFruitEaten ? fruit : null;
  }

  #lastUpdateTime = Date.now();

  #leftTimeToUpdate = 0;

  #update () {
    setTimeout(() => this.#update(), 0);

    const now = Date.now();
    const timeElapsed = now - this.#lastUpdateTime;

    this.#lastUpdateTime = now;
    this.#leftTimeToUpdate -= timeElapsed;

    if (this.#leftTimeToUpdate > 0) {
      return;
    }

    this.#leftTimeToUpdate += 1000 * 0.1;

    const { gameMap } = this;
    const { snake } = gameMap;

    snake.move();

    const eatenFruit = this.#checkFruitEating();

    if (eatenFruit) {
      gameMap.removeGameObj(eatenFruit);
      snake.eatFruit(eatenFruit);
      this.#dropFruit();
    }

    const eventName = Events.SNAKE_MOVE;
    const eventCallbacks = this.eventCallbacks[eventName];

    eventCallbacks.forEach((callback) => {
      callback({
        eventName,
        data: {
          gameMap: gameMap.getInfo(),
          body: snake.getInfo(),
          eatenFruit,
        },
      });
    });
  }

  start () {
    this.#dropFruit();
    this.#update();
  }

  /**
   *
   * @param {Direction} direction
   */
  setDirection (direction) {
    this.gameMap.snake.setDirection(direction);
  }

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
  }
}

export default SnakeGame;
