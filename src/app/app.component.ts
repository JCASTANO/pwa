import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '../../node_modules/@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa';

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      console.log('service worker habilitado');
      this.swUpdate.available.subscribe(evt => {
        window.location.reload();
      });
    }
  }
}
