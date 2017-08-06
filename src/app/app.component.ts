import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navigation: Array<any> = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Projects', routerLink: '/projects' },
    { label: 'Submit', routerLink: '/new' },
    { label: 'About', routerLink: '/about' },
  ]
  public title = 'shift';

  constructor() { }
}
