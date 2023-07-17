import Phaser from "phaser";

export class BitmapText extends Phaser.GameObjects.BitmapText {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    font: string,
    text: string | string[],
    size?: number,
    align?: number,
    isInteractive: boolean = false
  ) {
    super(scene, x, y, font, text, size, align);
    this.setInteractive({ useHandCursor: isInteractive });
  }
}