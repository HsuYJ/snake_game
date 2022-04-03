import SnakeGame, { Directions, GameObjTypes, Events } from './src';

SnakeGame.on(Events.INIT, (e) => {
  console.log(e);
}, { once: true });

SnakeGame.setup({
  name: 'World 1-1',
  author: 'Rex',
  width: 10,
  height: 10,
  gameObjs: [],
});
