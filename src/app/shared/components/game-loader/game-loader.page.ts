import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { VideoGame } from '@interfaces/game/videogame.interface';
import { DataTransferService } from '@services/data-transfer/data-transfer.service';
import { Payload } from '@interfaces/data-transfer/payload.interface';
import { EXIT_PRAY, GAME_PRAY } from '@constants/data-transfer-keys';

@Component({
  selector: 'app-game-loader',
  template: ` <ion-content>
    <div id="game"></div>
  </ion-content>`,
  styleUrls: ['game-loader.page.scss'],
})
export class GameLoaderPage implements OnInit, AfterViewInit, OnDestroy {
  private videoGame!: VideoGame;
  private phaserGame!: Phaser.Game;
  private config!: Phaser.Types.Core.GameConfig;

  private subCloseGame!: Subscription;
  private subGamedata!: Subscription;

  constructor(
    private platform: Platform,
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    DataTransferService.addPrayer({ key: EXIT_PRAY, data: null });
    this.initAllSubscriptions();
  }

  private initAllSubscriptions(): void {
    this.subGamedata = DataTransferService.getPrayer(GAME_PRAY).subscribe(
      (payload: Payload | undefined) => this.onGame(payload)
    );

    this.subCloseGame = DataTransferService.getPrayer(EXIT_PRAY).subscribe(
      (payload: Payload | undefined) => {
        if (payload?.data) this.onGameExit();
      }
    );
  }

  private onGame(payload: Payload | undefined): void {
    if (payload && !this.phaserGame) {
      this.videoGame = { ...payload.data };
      this.setGameConfig();
      this.phaserGame = new Phaser.Game(this.config);
    }
    if (
      !payload ||
      this.videoGame?.scenes?.length === 0 ||
      this.videoGame?.levels?.length === 0
    )
      this.onGameExit();
  }

  private setGameConfig(): void {
    this.config = {
      title: this.videoGame.name,
      width: this.platform.width(),
      height: this.platform.height(),
      render: {
        pixelArt: true,
      },
      scale: {
        width: this.platform.width(),
        height: this.platform.height(),
      },
      parent: 'game',
      scene: this.videoGame.scenes,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      backgroundColor: '#000000',
    };
  }

  private onGameExit(): void {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.phaserGame?.destroy(false);
    this.subCloseGame?.unsubscribe();
    this.subGamedata?.unsubscribe();
    DataTransferService?.holyGrenade();
  }
}
