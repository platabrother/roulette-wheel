import { Component, OnInit } from '@angular/core';
import { RoundService } from '@services/round.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public round$!: Observable<number>;
  public appName: string = environment.appName;
  public bettingHouseName: string = 'Casa de Apuestas';

  constructor(private readonly roundService: RoundService) {}

  ngOnInit(): void {
    this.round$ = of(10);
  }
}
