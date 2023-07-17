import Phaser from "phaser";

export class TextButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    style: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, text, style);
    this.setInteractive({ useHandCursor: true });
  }
}