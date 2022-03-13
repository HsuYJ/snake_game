import './style.css';
import SnakeGame from './src/core';

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

console.log(SnakeGame);

const game = SnakeGame.create({});
game.createMap({ size: { width: 10, height: 10 } });
console.log(game);
