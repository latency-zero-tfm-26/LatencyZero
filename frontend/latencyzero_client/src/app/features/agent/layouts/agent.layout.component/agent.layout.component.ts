import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../../../layout/components/navbar-component/navbar-component";

@Component({
  selector: 'app-agent.layout.component',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './agent.layout.component.html',
  styleUrl: './agent.layout.component.css',
})
export class AgentLayoutComponent {

}
