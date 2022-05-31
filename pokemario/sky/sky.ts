import {
  Position,
  Renderable,
  Size,
  Sprite,
  SpriteGroup,
  Vector2,
} from "../sprite";
import { Game } from "../game";
import { ImageLoader } from "../image-loader";
import cloud from "./cloud.svg";
import { filterSet, pickOne, projectSizeByWidth, randInt } from "../utils";
import { applyTransition, Transitions } from "../transition";

const cloudWidths = [100, 150, 200, 250];
const minCloudsPerScreen = 1;
const maxCloudsPerScreen = 5;

class Cloud extends Sprite {
  constructor(position: Position) {
    super(
      position,
      projectSizeByWidth(cloud, pickOne(cloudWidths)),
      ImageLoader.load(cloud.src)
    );
    this.opacity = 0;
  }

  tick(delta: number, game: Game) {
    this.opacity = applyTransition(
      {
        initial: { opacity: 0 },
        target: { opacity: 1 },
        state: { opacity: this.opacity },
        transition: Transitions.linear(250),
      },
      delta
    ).opacity;
    super.tick(delta, game);
  }
}

export class SkyBackground implements Renderable {
  velocity: Vector2 = { x: 0, y: 0 };
  size: Size = { width: 0, height: 0 };
  clouds = new SpriteGroup();

  constructor(public position: Position, game: Game) {
    this.size.width = game.width;
    this.size.height = game.height;
    this.createNewClouds(game);
  }

  createNewClouds(game: Game) {
    const targetCloudCount = randInt(minCloudsPerScreen, maxCloudsPerScreen);
    while (targetCloudCount > this.clouds.sprites.size) {
      this.clouds.sprites.add(
        new Cloud({
          x: randInt(0, game.width),
          y: randInt(0, Math.round((2 / 3) * game.height)),
        })
      );
    }
  }

  tick(delta: number, game: Game) {
    this.position.x += this.velocity.x;
    if (this.velocity.x < 0 && this.position.x < -this.size.width) {
      this.position.x = this.size.width;
    }
    if (this.velocity.x > 0 && this.position.x >= this.size.width) {
      this.position.x = -this.size.width;
    }

    // Check if any clouds are off-screen
    const numSpritesBefore = this.clouds.sprites.size;
    filterSet(this.clouds.sprites, (sprite) => {
      return (
        sprite.position.x + sprite.size.width >= 0 &&
        sprite.position.x <= game.width
      );
    });
    if (numSpritesBefore > this.clouds.sprites.size) {
      this.createNewClouds(game);
    }

    this.clouds.sprites.forEach((sprite) => {
      sprite.velocity = this.velocity;
    });
    this.clouds.tick(delta, game);
  }

  render(game: Game, ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, 0, game.height);
    gradient.addColorStop(0, "#5ac9ff");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, game.width, game.height);

    this.clouds.render(game, ctx);
  }
}
