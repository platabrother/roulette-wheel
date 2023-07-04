import Phaser from "phaser";

export class TileSprite extends Phaser.GameObjects.TileSprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    textureKey: string,
    frameKey?: string | number
  ) {
    super(scene, x, y, width, height, textureKey, frameKey);
  }
}