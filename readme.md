# Sanke Game

# Import
```javaScript
import SnakeGame, { Directions, GameObjTypes, Events } from 'snakeGame';
```

## Interface

### Enums

#### Directions

```javaScript
const Directions = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
};
```

#### GameObjTypes

```javaScript
const GameObjTypes = {
  SNAKE_BODY: 'SNAKE_BODY',
  STONE: 'STONE',
  FRUIT: 'FRUIT',
};
```

#### Events

```javaScript
const Events = {
  INIT: 'INIT',
  START: 'START',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  FRUIT: 'FRUIT',
  SNAKE_MOVE: 'SNAKE_MOVE',
  UPDATE: 'UPDATE',
  EAT: 'EAT',
  GAME_OVER: 'GAME_OVER',
};
```

### Methods

#### .setup(option)

```javaScript
const setupOption = {
  map: {
    name: 'Map I',
    author: 'Nice Guy',
    width: 10,
    height: 10,
    gameObjs: [{ type: GameObjTypes.STONE, x: 0, y: 0 }],
  },
  snakeSize: 3,
  direction: Directions.UP,
};

SnakeGame.setup(setupOption);
```

#### .start()

```javaScript
SnakeGame.start();
```

#### .reset()

```javaScript
SnakeGame.reset();
```

#### .pause()

```javaScript
SnakeGame.pause();
```

#### .resume()

```javaScript
SnakeGame.resume();
```

#### .setDirection(Direction)

```javaScript
SnakeGame.setDirection(Directions.UP);
```

#### .on(Event, callback. option)

```javaScript
const off = SnakeGame.on(Events.INIT, (e) => {
  console.log(e);
  // {
  //   eventName: 'INIT',
  //   data: {}
  // }
}, { once: true });
```

#### .off(Event, callback)

```javaScript
const eventCallback = () => {};

SnakeGame.off(Events.INIT, eventCallback);
```

### Event details

#### .INIT

```javaScript
const e = {
  eventName: Events.INIT,
  data: {
    snake: [{ type: GameObjTypes.SNAKE_BODY, x: 3, y: 3 }],
    gameMap: {
      width: 10,
      height: 10,
      gameObjs:[{ type: GameObjTypes.STONE, x: 0, y: 0 }],
    },
  },
};
```

#### .START

```javaScript
const e = {
  eventName: Events.START,
};
```

#### .PAUSE

```javaScript
const e = {
  eventName: Events.PAUSE,
};
```

#### .RESUME

```javaScript
const e = {
  eventName: Events.RESUME,
};
```

#### .DROP_FRUIT

```javaScript
const e = {
  eventName: Events.DROP_FRUIT,
  data: {
    fruit: { id: 'f000', type: GameObjTypes.FRUIT, x: 3, y: 3 },
  },
};
```

#### .SNAKE_MOVE

```javaScript
const e = {
  eventName: Events.SNAKE_MOVE,
  data: {
    body: [{ type: GameObjTypes.SNAKE_BODY, x: 3, y: 3 }],
  },
};
```

#### .UPDATE

```javaScript
const e = {
  eventName: Events.UPDATE,
  data: {
    body: [{ type: GameObjTypes.SNAKE_BODY, x: 3, y: 3 }],
  },
};
```

#### .EAT

```javaScript
const e = {
  eventName: Events.EAT,
  data: {
    fruit: {{ id: 'f000', type: GameObjTypes.FRUIT, x: 3, y: 3 },
  },
};
```

#### .GAME_OVER

```javaScript
const e = {
  eventName: Events.GAME_OVER,
  data: {
    score: 120,
  },
};
```
