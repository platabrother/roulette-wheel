import { EXIT_PRAY } from "@constants/data-transfer-keys";
import { DataTransferService } from "@services/data-transfer/data-transfer.service";
import { Sound } from "./sound/sound.interface";

export class Scene extends Phaser.Scene {
  protected touchSound?: Sound;
  protected confirmSound?: Sound;
  protected cancelSound?: Sound;

  constructor(sceneKey: string) {
    super({ key: sceneKey });
  }

  public preload(): void {
  }

  public init(params: any): void {}

  public create(): void {}

  //public update(time: number): void {}

  protected fadeInScene(): void {
    this.cameras.main.fadeIn(250, 0, 0, 0);
  }

  protected fadeOutScene(nextScene: string, param?: object): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(nextScene, param || {});
      }
    );
  }

  protected runScene(sceneKey: string): void {
    this.scene.start(sceneKey);
  }

  protected killGame(): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        DataTransferService.updatePrayer({ key: EXIT_PRAY, data: "exit" });
      }
    );
  }

  protected animateItems(
    targets: any,
    x: number,
    duration: number = 300
  ): void {
    this.add.tween({
      targets: targets,
      x: x,
      duration: duration,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  protected buildMainSoundEffects(): void {
    // this.touchSound = this.sound?.add(BONUS_SOUND_SECTION, {
    //   volume: SOUND_EFFECTS_VOLUME,
    // });
    // this.confirmSound = this.sound.add(START_SOUND_SECTION, {
    //   volume: SOUND_EFFECTS_VOLUME,
    // });
    // this.cancelSound = this.sound.add(WRONG_SOUND_SECTION, {
    //   volume: SOUND_EFFECTS_VOLUME,
    // });
  }
}