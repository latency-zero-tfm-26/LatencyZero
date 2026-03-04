import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgToastComponent } from "ng-angular-popup";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, NgToastComponent],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
