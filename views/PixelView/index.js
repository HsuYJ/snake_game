/**
 *
 * @typedef {{
 *  id: string;
 *  x: number;
 *  y: number;
 * color: string;
 * }} Pixel
 */

/**
 *
 * @param {object} target
 * @param {string} valueKey
 * @param {number} targetValue
 * @param {number} duration seconds
 */
function createTween (target, valueKey, targetValue, duration) {
  const targetRef = target;
  const value = target[valueKey];
  const deltaValue = targetValue - value;
  const totalTime = 1000 * duration;
  let elapsedTime = 0;
  let timestamp = Date.now();
  const update = () => {
    const now = Date.now();
    const elapsed = now - timestamp;

    timestamp = now;
    elapsedTime += elapsed;

    const isComplete = elapsedTime >= totalTime;
    const currentValue = (isComplete
      ? targetValue
      : value + (deltaValue * (elapsedTime / totalTime))
    );

    targetRef[valueKey] = currentValue;

    if (!isComplete) {
      setTimeout(update, 1000 / 60);
    }
  };

  update();
}

/**
 *
 * @param {number} width
 * @param {number} height
 * @param {number} blockSize
 * @returns
 */
function createCanvas (width, height, blockSize) {
  const canvas = document.createElement('canvas');

  canvas.width = blockSize * width;
  canvas.height = blockSize * height;
  canvas.style.cssText = `
    max-height: 75vh;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    background-color: white;
    // background-image:
    //   linear-gradient(
    //     90deg,
    //     rgba(0, 0, 0, 0.25) 1px,
    //     transparent 0 ${blockSize - 1}px,
    //     rgba(0, 0, 0, 0.25) 100%
    //   ),
    //   linear-gradient(
    //     0deg,
    //     rgba(0, 0, 0, 0.25) 1px,
    //     transparent 0 ${blockSize - 1}px,
    //     rgba(0, 0, 0, 0.25) 100%
    //   )
    // ;
    // background-size: ${blockSize}px ${blockSize}px;
    // background-position: 0 0;
    // background-repeat: repeat;
  `;
  document.body.appendChild(canvas);

  return canvas;
}

class PixelView {
  /**
   * @type {Map<string, Pixel>}
   */
  #pixels = new Map();

  /**
   *
   * @param {{
   *  width: number;
   *  height: number;
   *  blockSize: number;
   * }} option
   */
  setup (option = {}) {
    const {
      width,
      height,
      blockSize = 10,
    } = option;
    const canvas = createCanvas(width, height, blockSize);

    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.render = this.render.bind(this);
  }

  /**
   *
   * @param {Pixel} pixel
   * @returns
   */
  add (pixel) {
    const {
      x,
      y,
      id = `${x}, ${y}`,
    } = pixel;

    this.#pixels.set(id, pixel);

    return id;
  }

  /**
   *
   * @param {string} id
   */
  removeById (id) {
    this.#pixels.delete(id);
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  removeByPosition (x, y) {
    this.#pixels.delete(`${x},${y}`);
  }

  /**
   *
   * @param {string} id
   * @param {number} x
   * @param {number} y
   */
  moveTo (id, x, y) {
    const pixels = this.#pixels;
    const currentPixel = pixels.get(id);

    if (currentPixel) {
      const duration = 0.1;

      createTween(currentPixel, 'x', x, duration);
      createTween(currentPixel, 'y', y, duration);
    }

    return !!currentPixel;
  }

  render () {
    requestAnimationFrame(this.render);

    const {
      canvas,
      blockSize,
    } = this;
    const pixels = this.#pixels;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(({ x, y, color }) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.translate(blockSize * x, blockSize * y);
      ctx.fillRect(0, 0, blockSize, blockSize);
      ctx.restore();
    });
  }

  startRender () {
    this.render();
  }
}

export default PixelView;
