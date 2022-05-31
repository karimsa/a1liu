import {
  Renderable,
  Sprite,
  RenderableGroup,
  vec2equal,
  vec2mul,
  Vector2,
  Size,
} from "../sprite";
import { Game } from "../game";
import { SkyBackground } from "./sky";
import { applyTransition, Transitions } from "../transition";
import { KeyboardKey } from "../interaction-monitor";

class Ground extends Renderable {
  velocity: Vector2 = { x: 0, y: 0 };

  render(game: Game, ctx: CanvasRenderingContext2D): void {
    const height = Math.round(0.15 * game.height);
    ctx.fillStyle = `#8e0909`;
    ctx.fillRect(0, game.height - height, game.width, height);

    const grassHeight = Math.round(0.01 * game.height);
    ctx.fillStyle = `green`;
    ctx.fillRect(
      0,
      game.height - height - grassHeight,
      game.width,
      grassHeight
    );
  }

  tick(delta: number, game: Game): void {}
}

export class Landscape extends RenderableGroup<
  Renderable & { velocity: Vector2 }
> {
  direction: "left" | "right" | null = null;
  currentVelocity: Vector2 = { x: 0, y: 0 };
  walkVelocity: Vector2;
  sprintVelocity: Vector2;

  constructor(game: Game) {
    super(
      new Set([
        new SkyBackground(
          {
            x: 0,
            y: 0,
          },
          game
        ),
        new SkyBackground(
          {
            x: game.width,
            y: 0,
          },
          game
        ),
        new Ground(),
      ])
    );

    this.walkVelocity = { x: 0.01 * game.width, y: 0 };
    this.sprintVelocity = vec2mul(3, this.walkVelocity);
  }

  tick(delta: number, game: Game) {
    const currentDirection = game.monitor.isPressed(KeyboardKey.Right)
      ? "right"
      : game.monitor.isPressed(KeyboardKey.Left)
      ? "left"
      : null;
    const velocity = currentDirection
      ? game.monitor.isPressed(KeyboardKey.Shift)
        ? this.sprintVelocity
        : this.walkVelocity
      : { x: 0, y: 0 };

    this.currentVelocity = applyTransition(
      {
        initial: vec2mul(
          this.direction === "left" ? 1 : this.direction === "right" ? -1 : 0,
          velocity
        ),
        target: vec2mul(
          currentDirection === "left"
            ? 1
            : currentDirection === "right"
            ? -1
            : 0,
          velocity
        ),
        state: this.currentVelocity,
        transition: Transitions.linear(250),
      },
      delta
    );
    this.direction = currentDirection;
    this.sprites.forEach((sprite) => {
      sprite.velocity = this.currentVelocity;
    });

    super.tick(delta, game);
  }
}
