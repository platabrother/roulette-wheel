import { Component, OnInit } from '@angular/core';
import { RoundService } from '@services/round.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public round$!: Observable<number>;
  public bettingHouseName: string = 'Casa de Apuestas';

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.round$ = this.roundService.getRoundNumber();
  }
}
