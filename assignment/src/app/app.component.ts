import { Component } from '@angular/core';

export interface IRoute {
  startpoint: string;
  endpoint: string;
  code: string;
  link: string;
  level: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  start: string = '';
  end: string = '';
  route: IRoute[] = [];
  addRoute() {
    this.route.push({'startpoint': this.start,'endpoint': this.end,'code': this.start.substring(0,3).toUpperCase() + '-' + this.end.substring(0,3).toUpperCase(), 'link': '', 'level': '1'});
    for (let i = 0; i < this.route.length; i++) {
        if (i === 0) {
          this.route[i].link = '';
        } else {
          if (this.route[i].startpoint === this.route[i - 1].startpoint && this.route[i].endpoint === this.route[i - 1].endpoint) {
            this.route[i].link = 'straight';
            this.route[i].level = '2';
            this.route[i - 1].level = '2';
            if (this.route[i - 2].level === '1') {
              this.route[i - 1].link = 'curve1';
            }

          } else if (this.route[i].startpoint === this.route[i - 1].endpoint) {
            this.route[i].link = 'straight';
            if (this.route[i - 1].level === '2') {
              this.route[i].link = 'curve2';
            }
          } else {
            this.route[i].link = 'arrow';
            if (this.route[i - 1].level === '2') {
              this.route[i].link = 'curve2';
            }
          }
        }
    }
    this.start = '';
    this.end = '';
    console.log(this.route);
  }
}
