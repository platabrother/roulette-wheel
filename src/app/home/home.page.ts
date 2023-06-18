import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('spin') spin!: ElementRef;
  @ViewChild('reset') reset!: ElementRef;
  @ViewChild('inner', { static: true }) inner!: ElementRef;
  @ViewChild('data', { static: true }) data!: ElementRef;
  @ViewChild('mask') mask!: ElementRef;
  @ViewChild('plate') plate!: ElementRef;
  @ViewChild('ball') ball!: ElementRef;

  spinButtonVisible!: boolean;
  resetButtonVisible!: boolean;
  maskText!: string;
  resultNumber!: number;
  resultColor!: string;

  maskDefault = 'Númro ganador';
  timer = 1000;
  red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  previousResults: any[] = [];

  public numbers: number[] = Array(37)
    .fill(0)
    .map((x, i) => i);

  ngAfterViewInit() {
    const spinClick$ = fromEvent(this.spin.nativeElement, 'click');
    const resetClick$ = fromEvent(this.reset.nativeElement, 'click');

    spinClick$.subscribe(() => this.spinHandler());
    resetClick$.subscribe(() => this.resetHandler());

    const mc = new Hammer(this.plate.nativeElement);
    mc.on('swipe', (ev) => this.swipeHandler());
  }

  spinHandler() {
    const randomNumber = Math.floor(Math.random() * 36);
    let color = null;
    this.inner.nativeElement.setAttribute('data-spinto', randomNumber);
    this.spin.nativeElement.style.display = 'none';
    this.reset.nativeElement.style.display = 'block';
    this.reset.nativeElement.disabled = true;

    setTimeout(() => {
      const rotationDegrees = randomNumber * (360 / this.numbers.length);
      this.inner.nativeElement.style.transform = `rotate(${rotationDegrees}deg)`;
    }, this.timer / 2);

    setTimeout(() => {
      this.mask.nativeElement.textContent = 'Finalizando...';
    }, this.timer / 2);

    setTimeout(() => {
      this.mask.nativeElement.textContent = this.maskDefault;
    }, this.timer + 500);

    // Hacer que la bola gire un poco después de que la ruleta comienza a girar y hacer que gire un poco más
    setTimeout(() => {
      const additionalRotation = 360 * (1 + Math.random()); // agregar rotación adicional
      const rotationDegrees =
        randomNumber * (360 / this.numbers.length) + additionalRotation;
      this.ball.nativeElement.style.transform = `rotate(${rotationDegrees}deg)`;
    }, this.timer);

    setTimeout(() => {
      this.reset.nativeElement.disabled = false;
      if (this.red.includes(randomNumber)) {
        color = 'red';
      } else {
        color = 'black';
      }
      if (randomNumber === 0) {
        color = 'green';
      }

      const result = {
        number: randomNumber,
        color: color,
      };

      this.previousResults.unshift(result);
      this.data.nativeElement.classList.add('reveal');
      this.inner.nativeElement.classList.add('rest');

      this.resultNumber = randomNumber;
      this.resultColor = color;
    }, this.timer + 60); // Puedes ajustar este valor según sea necesario
  }

  resetHandler() {
    this.inner.nativeElement.setAttribute('data-spinto', '');
    this.inner.nativeElement.classList.remove('rest');
    this.reset.nativeElement.style.display = 'none';
    this.spin.nativeElement.style.display = 'block';
    this.data.nativeElement.classList.remove('reveal');
  }

  swipeHandler() {
    if (!this.reset.nativeElement.disabled) {
      if (this.spin.nativeElement.style.display !== 'none') {
        this.spinHandler();
      } else {
        this.resetHandler();
      }
    }
  }
}
