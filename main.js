import SnakeGame, { Directions, GameObjTypes, Events } from './src';
import PixelView from './views/PixelView';

// game
const mapData = {
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
};
const game = SnakeGame.create();

// view
const blockSize = parseInt(Math.min(
  (window.innerWidth - 20) / mapData.width,
  (window.innerHeight - 20) / mapData.height,
), 10);
const GameObjColors = {
  [GameObjTypes.SNAKE_BODY]: 'green',
  [GameObjTypes.STONE]: 'gray',
  [GameObjTypes.FRUIT]: 'orange',
};
const pixelView = new PixelView();
const smallMap = new PixelView();

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
    rootCanvas: document.getElementById('playGround'),
  });
  gameObjs.forEach(({
    id, x, y, type,
  }) => {
    pixelView.add({
      id, x, y, color: GameObjColors[type],
    });
  });
  snake.forEach(({
    id, x, y, type,
  }) => {
    pixelView.add({
      id, x, y, color: GameObjColors[type],
    });
  });
  pixelView.startRender();

  // smallMap
  smallMap.setup({
    width,
    height,
    blockSize: blockSize * 0.2,
    rootCanvas: document.getElementById('smallMap'),
  });
  gameObjs.forEach(({
    id, x, y, type,
  }) => {
    smallMap.add({
      id, x, y, color: GameObjColors[type],
    });
  });
  snake.forEach(({
    id, x, y, type,
  }) => {
    smallMap.add({
      id, x, y, color: GameObjColors[type],
    });
  });
  smallMap.startRender();
}, { once: true });

game.on(Events.SNAKE_MOVE, (e) => {
  const {
    data: {
      gameMap: { gameObjs },
      updateInterval,
      body,
      eatenFruit,
    },
  } = e;

  body.forEach(({
    id, x, y, type,
  }) => {
    // PixelView
    const isPixelExisting = pixelView.moveTo(id, x, y, updateInterval);

    if (!isPixelExisting) {
      pixelView.add({
        id, x, y, color: GameObjColors[type],
      });
    }

    // smallMap
    smallMap.removeById(id);
    smallMap.add({
      id, x, y, color: GameObjColors[type],
    });
  });

  if (eatenFruit) {
    // PixelView
    pixelView.removeById(eatenFruit.id);
    // smallMap
    smallMap.removeById(eatenFruit.id);
  }

  // pixelView.render();
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
  pixelView.add({
    id, x, y, color: GameObjColors[type],
  });
  // smallMap
  smallMap.add({
    id, x, y, color: GameObjColors[type],
  });
});

game.on(Events.GAME_OVER, () => {
  window.setTimeout(() => {
    window.confirm('GAME OVER');
  }, 1000 * 0.5);
});

game.setup(mapData);

document.onkeydown = (e) => {
  if (e.isComposing) {
    return;
  }

  if (!game.playing) {
    game.start();
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
