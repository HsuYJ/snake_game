import GameObjs from '../gameObjs';
import Snake from '../gameObjs/Snake';
import Fruit from '../gameObjs/Fruit';

/**
 * @typedef {import('../gameObjs/GameObj').default} GameObj
 * @typedef {{
 *  name: string;
 *  author: string;
 *  width: number;
 *  height: number;
 *  gameObjs: GameObj[];
 * }} MapData
 */

class GameMap {
  /**
   * @type {GameObj[]}
   */
  gameObjs = [];

  /**
   * @type {Snake}
   */
  snake = null;

  size = { width: 10, height: 10 };

  /**
   *
   * @param {MapData} mapData
   * @returns
   */
  static create (mapData) {
    const { width, height, gameObjs } = mapData;
    const gameMap = new this();

    gameMap.size = { width, height };
    gameMap.gameObjs = gameObjs.map(({ type, x, y }) => {
      const gameObj = GameObjs[type].create({
        position: { x, y },
      });

      return gameObj;
    });
    gameMap.snake = Snake.create({
      position: { x: Math.round(width / 2), y: Math.round(height / 2) },
      size: 5,
    });

    return gameMap;
  }

  /**
   *
   * @param {string} gameObjId
   */
  removeGameObj (gameObjId) {
    const { gameObjs } = this;
    const index = gameObjs.findIndex((gameObj) => gameObj.id === gameObjId);

    gameObjs.splice(index, 0);
  }

  dropFruit () {
    const {
      size: { width, height },
      gameObjs,
      snake,
    } = this;

    const allPos = Array.from({ length: width }, (value0, x) => {
      const column = Array.from({ length: height }, (value1, y) => `${x},${y}`);
      return column;
    }).flat();
    const occupiedPos = gameObjs.concat(snake.body).map(({ position: { x, y } }) => `${x},${y}`);
    const availablePos = allPos.filter((position) => !occupiedPos.includes(position));
    const [x, y] = availablePos[Math.floor(availablePos.length * Math.random())].split(',');
    const fruit = Fruit.create({ position: { x: +x, y: +y } });

    gameObjs.push(fruit);

    return fruit;
  }

  getInfo () {
    return {
      ...this.size,
      gameObjs: this.gameObjs.map((gameObj) => gameObj.getInfo()),
    };
  }
}

export default GameMap;
