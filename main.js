import SnakeGame, { Directions, GameObjTypes, Events } from './src';
import PixelView from './views/PixelView';

// game
const game = SnakeGame.create();
const data = {
  /**
   * @type {Set<string>}
   */
  fruits: new Set(),
};

// view
const blockSize = 40;
const GameObjColors = {
  [GameObjTypes.SNAKE_BODY]: 'green',
  [GameObjTypes.STONE]: 'gray',
  [GameObjTypes.FRUIT]: 'orange',
};
const pixelView = new PixelView();
const pixelData = {
  /**
   * @type {Set<string>}
   */
  snake: new Set(),
  /**
   * @type {Set<string>}
   */
  fruits: new Set(),
};

game.on(Events.INIT, (e) => {
  console.log(e);
  const {
    data: {
      snake,
      gameMap: {
        width,
        height,
        gameObjs,
      },
    },
  } = e;

  // PixelView
  pixelView.setup({
    width,
    height,
    blockSize,
  });
  gameObjs.forEach(({ x, y, type }) => {
    pixelView.add({ x, y, color: GameObjColors[type] });
  });
  snake.forEach(({ x, y, type }) => {
    const pixelId = pixelView.add({ x, y, color: GameObjColors[type] });

    pixelData.snake.add(pixelId);
  });
  pixelView.render();

  // start
  game.start();
}, { once: true });

game.on(Events.SNAKE_MOVE, (e) => {
  const {
    data: {
      body,
    },
  } = e;

  // PixelView
  pixelData.snake.forEach((id) => {
    pixelView.removeById(id);
  });
  pixelData.snake.clear();
  body.forEach(({ x, y, type }) => {
    const pixelId = pixelView.add({ x, y, color: GameObjColors[type] });

    pixelData.snake.add(pixelId);
  });
  pixelView.render();
});

game.on(Events.DROP_FRUIT, (e) => {
  const {
    data: {
      fruit: {
        id, type, x, y,
      },
    },
  } = e;

  // PixelView
  const pixelId = pixelView.add({ x, y, color: GameObjColors[type] });

  data.fruits.add(id);
  pixelData.fruits.add(pixelId);
  pixelView.render();
});

game.setup({
  name: 'World 1-1',
  author: 'Rex',
  width: 20,
  height: 20,
  gameObjs: [
    { type: GameObjTypes.STONE, x: 2, y: 3 },
    { type: GameObjTypes.STONE, x: 2, y: 4 },
    { type: GameObjTypes.STONE, x: 2, y: 5 },
    { type: GameObjTypes.STONE, x: 3, y: 5 },
    { type: GameObjTypes.STONE, x: 4, y: 5 },
    { type: GameObjTypes.STONE, x: 5, y: 5 },

    { type: GameObjTypes.STONE, x: 12, y: 13 },
    { type: GameObjTypes.STONE, x: 12, y: 14 },
    { type: GameObjTypes.STONE, x: 12, y: 15 },
    { type: GameObjTypes.STONE, x: 13, y: 15 },
    { type: GameObjTypes.STONE, x: 14, y: 15 },
    { type: GameObjTypes.STONE, x: 15, y: 15 },
  ],
});

document.onkeydown = (e) => {
  if (e.isComposing) {
    return;
  }

  let direction = Directions.UP;

  switch (e.key) {
    case 'w':
      direction = Directions.UP;
      break;
    case 'd':
      direction = Directions.RIGHT;
      break;
    case 's':
      direction = Directions.DOWN;
      break;
    case 'a':
      direction = Directions.LEFT;
      break;
    default:
      // do nothing
  }

  game.setDirection(direction);
};
