import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinners',
  template: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinners.component.css']
})
export class LoadingSpinnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
