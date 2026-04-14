import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  description: string;

  constructor() {
    this.title = 'Employee-Management-Frontend';
    this.description = 'This Employee Management system reflects the journey of a man, his surfboard, and his team.';
  }
}
