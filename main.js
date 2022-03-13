import './style.css';
import SnakeGame from './src/core';

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

console.log(SnakeGame);

const game = SnakeGame.create({});
game.createMap({ size: { width: 10, height: 10 } });
game.createSnake(4);
console.log(game);

const blockSize = 40;
/**
 *
 * @param {number} x
 * @param {number} y
 * @returns
 */
const getBlockStyle = (x, y) => `
  position: absolute;
  left: ${blockSize * x + blockSize}px;
  top: ${blockSize * y + blockSize}px;
  width: ${blockSize}px;
  height: ${blockSize}px;
  font-size: 8px;
  color: white;
  background-color: red;
  border-radius: 10px;
  transform: scale(0.96);

  display: grid;
  place-items: center;
`;

game.gameMap.walls.forEach((wall) => {
  const { position: [x, y] } = wall;
  const el = document.createElement('div');

  el.innerText = `(${x},${y})`;
  el.style.cssText = getBlockStyle(x, y);

  document.body.appendChild(el);
});

game.snake.body.forEach((part) => {
  const { position: [x, y] } = part;
  const el = document.createElement('div');

  el.innerText = `(${x},${y})`;
  el.style.cssText = getBlockStyle(x, y);

  document.body.appendChild(el);
});
