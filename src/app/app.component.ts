import { Component } from '@angular/core';
import { ImortgageDetail } from 'src/app/shared/interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-Mortgage-Calculator';
  isDetailAvailable = false;
  mortgageDetails!: ImortgageDetail;

  ngOnInit(): void {}

  //Getting Obj value from the child component through EventEmitter
  getMortageDetails = (obj: any) => {
    this.isDetailAvailable = true;
    this.mortgageDetails = Object.assign({}, obj);
  };
}
