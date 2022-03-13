import Entity from './entity';

class GameMap {
  /**
   * @type {Entity[]}
   */
  walls = [];

  /**
   *
   * @param {{
   *  width: number;
   *  height: number;
   * }} options
   */
  static create (options) {
    const { width, height } = options;
    const gameMap = new this();
    const { walls } = gameMap;
    const baseX = [-1, width];
    const baseY = [-1, height];

    baseX.forEach((x) => {
      for (let y = 0; y < height; y += 1) {
        const wall = Entity.create({ position: [x, y] });

        walls.push(wall);
      }
    });

    baseY.forEach((y) => {
      for (let x = -1; x <= width; x += 1) {
        const wall = Entity.create({ position: [x, y] });

        walls.push(wall);
      }
    });

    return gameMap;
  }
}

export default GameMap;
