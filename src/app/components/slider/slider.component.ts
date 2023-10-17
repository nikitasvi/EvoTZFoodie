import { Component } from '@angular/core';
import { Plugin } from "@egjs/ngx-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  plugins: Plugin[] = [new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: false })];
}
