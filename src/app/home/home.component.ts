import { Component, OnInit } from '@angular/core';
import { NucleoService } from '../service/nucleo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: NucleoService) { }

  ngOnInit() {}
}
