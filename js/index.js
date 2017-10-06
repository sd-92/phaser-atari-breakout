var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update
});

let ball;
let paddle;
let bricks;
let newBrick;
let brickSettings;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.load.image('brick', 'sprites/brick.png');
  game.load.image('ball', 'sprites/ball.png');
  game.load.image('paddle', 'sprites/paddle.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  ball = game.add.sprite(
    game.world.width * 0.5,
    game.world.height - 25,
    'ball'
  );
  ball.anchor.set(0.5);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.velocity.set(150, -150);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(function() {
    // alert('Game over!');
    location.reload();
  }, this);

  paddle = game.add.sprite(
    game.world.width * 0.5,
    game.world.height - 5,
    'paddle'
  );
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.collideWorldBounds = true;
  paddle.anchor.set(0.5, 1);
  paddle.body.immovable = true;

  initBricks();
}

function update() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    paddle.x -= 4;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    paddle.x += 4;
  }
  game.physics.arcade.collide(ball, bricks, brickHit);
  game.physics.arcade.collide(ball, paddle);
}

function initBricks() {
  brickSettings = {
    width: 50,
    height: 20,
    count: {
      row: 7,
      col: 3
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };
  bricks = game.add.group();
  for (c = 0; c < brickSettings.count.col; c++) {
    for (r = 0; r < brickSettings.count.row; r++) {
      let x =
        r * (brickSettings.width + brickSettings.padding) +
        brickSettings.offset.left;
      let y =
        c * (brickSettings.height + brickSettings.padding) +
        brickSettings.offset.top;
      newBrick = game.add.sprite(x, y, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}

function brickHit(ball, brick) {
  brick.kill();
}
