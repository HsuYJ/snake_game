import GameObjTypes from '../enums/GameObjTypes';
import SnakeBody from './SnakeBody';
import Stone from './Stone';
import Fruit from './Fruit';

export default {
  [GameObjTypes.SNAKE_BODY]: SnakeBody,
  [GameObjTypes.STONE]: Stone,
  [GameObjTypes.FRUIT]: Fruit,
};
