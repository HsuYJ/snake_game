# Sanke Game

# Import
```javaScript
import SnakeGame, { Directions, EntityTypes, Events } from 'snakeGame';
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

#### EntityTypes

```javaScript
const EntityTypes = {
  BODY: 'BODY',
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
  MOVE: 'MOVE',
  EAT: 'EAT',
  GAME_OVER: 'GAME_OVER',
};
```

### Methods

#### .setup(options)

```javaScript
const setupOptions = {
  map: {
    name: 'Map I',
    author: 'Nice Guy',
    entities: [{ entityType: EntityTypes.STONE, x: 0, y: 0 }],
  },
  snakeSize: 3,
  direction: Directions.UP,
};

SnakeGame.setup(setupOptions);
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

#### .on(Event, callback. options)

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
    body: [{ entityType: EntityTypes.BODY, x: 3, y: 3 }],
    map: [{ entityType: EntityTypes.STONE, x: 0, y: 0 }],
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

#### .FRUIT

```javaScript
const e = {
  eventName: Events.FRUIT,
  data: {
    fruit: {
      id: 'f000',
      x: 2,
      y: 3,
    },
  },
};
```

#### .MOVE

```javaScript
const e = {
  eventName: Events.MOVE,
  data: {
    body: [{ entityType: 'body', x: 3, y: 3 }],
  },
};
```

#### .EAT

```javaScript
const e = {
  eventName: Events.EAT,
  data: {
    fruit: {
      id: 'f000',
      x: 2,
      y: 3,
    },
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
