import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameComponent } from '../../components/game.component/game.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CommonModule, GameComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
