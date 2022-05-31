import { Renderable, Sprite } from "./sprite";
import { Landscape } from "./sky";
import { InteractionMonitor, KeyboardKey } from "./interaction-monitor";
import { MarioCharacter } from "./characters/mario";

export class Game {
  score: number = 0;
  timeElapsed = 0;
  renderables: Renderable[] = [];
  monitor = new InteractionMonitor();

  landscape: Landscape;
  // TODO: Make this a super class
  player: MarioCharacter;

  // TODO: move this into main player
  lives = 3;

  constructor(public width: number, public height: number) {
    this.landscape = new Landscape(this);
    this.player = new MarioCharacter(this.landscape.ground.position);

    this.renderables.push(this.landscape, this.player);
  }

  destroy() {
    this.monitor.destroy();
  }

  tick(delta: number): void {
    this.timeElapsed += delta;
    for (const renderable of this.renderables) {
      renderable.tick(delta, this);
    }
  }

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.width = canvas.width;
    this.height = canvas.height;
    ctx.clearRect(0, 0, this.width, this.height);

    for (const renderable of this.renderables) {
      renderable.render(this, ctx);
    }
  }
}
