import GameObjTypes from './enums/GameObjTypes';
import Events from './enums/Events';
import GameMap from './gameMap';
import Fruit from './gameObjs/Fruit';

export { default as Directions } from './enums/Directions';
export { default as GameObjTypes } from './enums/GameObjTypes';
export { Events };

class SnakeGame {
  /**
   * @type {Object<string, Set<Function>>}
   */
  eventCallbacks = {
    [Events.INIT]: new Set(),
    [Events.SNAKE_MOVE]: new Set(),
    [Events.UPDATE]: new Set(),
    [Events.DROP_FRUIT]: new Set(),
    [Events.GAME_OVER]: new Set(),
  };

  static create () {
    const game = new this();

    return game;
  }

  /**
   *
   * @param {import('./gameMap').MapData} mapData
   */
  setup (mapData) {
    const gameMap = GameMap.create(mapData);

    this.gameMap = gameMap;

    const eventName = Events.INIT;
    const eventCallbacks = this.eventCallbacks[eventName];
    const snake = gameMap.snake.getInfo();

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

  #score = 0;

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

  #checkCollision () {
    const { gameMap } = this;
    const { width, height, gameObjs } = gameMap.getInfo();
    const [head, ...snakeBodies] = gameMap.snake.getInfo();
    const { x, y } = head;
    const allObjs = gameObjs.concat(snakeBodies).filter(({ type }) => type !== GameObjTypes.FRUIT);
    const isCollidedWithGameObj = allObjs.some((gameObj) => (gameObj.x === x && gameObj.y === y));

    if (isCollidedWithGameObj) {
      return isCollidedWithGameObj;
    }

    const isCollidedWithWall = (x < 0
      || x >= width
      || y < 0
      || y >= height
    );

    return isCollidedWithWall;
  }

  playing = false;

  #gameover = false;

  #updateInterval = 0.2;

  #lastUpdateTime = Date.now();

  #leftTimeToUpdate = 0;

  #update () {
    if (this.#gameover) {
      const eventName = Events.GAME_OVER;
      const eventCallbacks = this.eventCallbacks[eventName];
      const score = this.#score;

      eventCallbacks.forEach((callback) => {
        callback({
          eventName,
          data: {
            score,
          },
        });
      });

      return;
    }

    requestAnimationFrame(() => this.#update());

    const now = Date.now();
    const timeElapsed = now - this.#lastUpdateTime;

    this.#lastUpdateTime = now;
    this.#leftTimeToUpdate -= timeElapsed;

    if (this.#leftTimeToUpdate > 0) {
      return;
    }

    const updateInterval = this.#updateInterval;

    this.#leftTimeToUpdate += 1000 * updateInterval;

    const { gameMap } = this;
    const { snake } = gameMap;

    snake.move();

    const isCollided = this.#checkCollision();

    if (isCollided) {
      this.#gameover = true;
    }

    const eatenFruit = this.#checkFruitEating();

    if (eatenFruit) {
      gameMap.removeGameObj(eatenFruit);
      snake.eatFruit(eatenFruit);
      this.#score += 1;
      this.#dropFruit();
    }

    const eventName = Events.SNAKE_MOVE;
    const eventCallbacks = this.eventCallbacks[eventName];
    const score = this.#score;

    eventCallbacks.forEach((callback) => {
      callback({
        eventName,
        data: {
          updateInterval,
          gameMap: gameMap.getInfo(),
          body: snake.getInfo(),
          eatenFruit,
          score,
        },
      });
    });
  }

  start () {
    this.playing = true;
    this.#dropFruit();
    this.#lastUpdateTime = Date.now();
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
