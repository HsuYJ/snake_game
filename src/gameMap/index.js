import Snake from '../gameObjs/Snake';

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

  /**
   *
   * @param {MapData} mapData
   * @returns
   */
  static create (mapData) {
    const { gameObjs } = mapData;
    const gameMap = new this();

    gameMap.gameObjs = gameObjs;
    gameMap.snake = Snake.create({
      position: { x: 3, y: 3 },
      size: 2,
    });

    return gameMap;
  }
}

export default GameMap;
