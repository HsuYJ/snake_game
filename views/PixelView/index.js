/**
 *
 * @typedef {{
 *  id: string;
 *  x: number;
 *  y: number;
 * color: string;
 * }} Pixel
 */

const createTween = (() => {
  /**
   * @type {Set<{
   *  target: {};
   *  valueKey: string;
   *  value: number;
   *  targetValue: number;
   *  deltaValue: number;
   *  totalTime: number;
   *  elapsedTime: number;
   * }>}
   */
  const tweens = new Set();
  let timestamp = Date.now();

  function update () {
    requestAnimationFrame(update);

    const now = Date.now();
    const elapsed = now - timestamp;

    timestamp = now;

    tweens.forEach((tween) => {
      const tweenRef = tween;

      tweenRef.elapsedTime += elapsed;

      const {
        value,
        targetValue,
        deltaValue,
        totalTime,
        elapsedTime,
      } = tweenRef;

      const isComplete = elapsedTime >= totalTime;
      const currentValue = (isComplete
        ? targetValue
        : value + (deltaValue * (elapsedTime / totalTime))
      );

      tweenRef.target[tweenRef.valueKey] = currentValue;

      if (isComplete) {
        tweens.delete(tween);
      }
    });
  }

  /**
   *
   * @param {object} target
   * @param {string} valueKey
   * @param {number} targetValue
   * @param {number} duration seconds
   */
  function create (target, valueKey, targetValue, duration) {
    const value = target[valueKey];
    const deltaValue = targetValue - value;
    const totalTime = duration * 1000;

    tweens.add({
      target,
      valueKey,
      value,
      targetValue,
      deltaValue,
      totalTime,
      elapsedTime: 0,
    });
  }

  update();

  return create;
})();

/**
 *
 * @param {number} width
 * @param {number} height
 * @param {number} blockSize
 * @param {HTMLCanvasElement} rootCanvas
 * @returns
 */
function createCanvas (width, height, blockSize, rootCanvas) {
  const canvas = rootCanvas || document.createElement('canvas');

  canvas.width = blockSize * width;
  canvas.height = blockSize * height;
  canvas.style.cssText = `
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    background-color: white;
  `;

  if (!canvas.parentNode) {
    document.body.appendChild(canvas);
  }

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
   *  rootCanvas: HTMLCanvasElement;
   * }} option
   */
  setup (option = {}) {
    const {
      width,
      height,
      blockSize = 10,
      rootCanvas,
    } = option;
    const canvas = createCanvas(width, height, blockSize, rootCanvas);
    const shadowCanvas = canvas.cloneNode();

    this.canvas = canvas;
    this.shadowCanvas = shadowCanvas;
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.render = this.render.bind(this);

    const shadowCtx = shadowCanvas.getContext('2d');

    shadowCtx.fillStyle = 'white';
    shadowCtx.fillRect(0, 0, canvas.width, canvas.height);
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
   * @param {number} duration second(s)
   */
  moveTo (id, x, y, duration) {
    const pixels = this.#pixels;
    const currentPixel = pixels.get(id);

    if (currentPixel) {
      createTween(currentPixel, 'x', x, duration);
      createTween(currentPixel, 'y', y, duration);
    }

    return !!currentPixel;
  }

  #lastRenderTime = Date.now();

  #leftTimeToRender = 0;

  render () {
    requestAnimationFrame(this.render);

    const now = Date.now();
    const timeElapsed = now - this.#lastRenderTime;

    this.#lastRenderTime = now;
    this.#leftTimeToRender -= timeElapsed;

    if (this.#leftTimeToRender > 0) {
      return;
    }

    this.#leftTimeToRender += 1000 / 60;

    const {
      canvas,
      shadowCanvas,
      blockSize,
    } = this;
    const { width, height } = shadowCanvas;
    const pixels = this.#pixels;
    const ctx = canvas.getContext('2d');
    const shadowCtx = shadowCanvas.getContext('2d');

    shadowCtx.clearRect(0, 0, width, height);
    // shadowCtx.fillStyle = 'white';
    // shadowCtx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    pixels.forEach(({ x, y, color }) => {
      shadowCtx.save();
      shadowCtx.fillStyle = color;
      shadowCtx.translate(blockSize * x, blockSize * y);
      shadowCtx.fillRect(0, 0, blockSize, blockSize);
      shadowCtx.restore();
    });

    // if (true ?? this.is3d) {
    //   ctx.save();
    //   ctx.globalAlpha = 0.2;

    //   for (let i = blockSize / 4; i > 0; i -= 1) {
    //     ctx.drawImage(shadowCanvas, i, i * 2, width, height);
    //   }

    //   ctx.restore();
    // }

    ctx.drawImage(shadowCanvas, 0, 0, width, height);
  }

  startRender () {
    this.render();
  }
}

export default PixelView;
