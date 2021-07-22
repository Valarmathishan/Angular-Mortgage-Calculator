import { Component, OnInit, Input } from '@angular/core';
import { ImortgageDetail } from 'src/app/shared/interface';
@Component({
  selector: 'app-mortgage-details',
  templateUrl: './mortgage-details.component.html',
  styleUrls: ['./mortgage-details.component.css'],
})
export class MortgageDetailsComponent implements OnInit {
  //Getting input from the parent
  @Input() mortgageDetails!: ImortgageDetail;

  constructor() {}

  ngOnInit(): void {}
}
