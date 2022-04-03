import GameObjTypes from '../enums/GameObjTypes';
import GameObj from './GameObj';

class SnakeBody extends GameObj {
  type = GameObjTypes.SNAKE_BODY;
}

export default SnakeBody;
