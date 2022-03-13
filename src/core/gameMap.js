class GameMap {
  width = 0;

  height = 0;

  /**
   *
   * @param {{
   *  width: number;
   *  height: number;
   * }} options
   */
  static create (options) {
    const { width, height } = options;

    this.width = width;
    this.height = height;
  }
}

export default GameMap;
