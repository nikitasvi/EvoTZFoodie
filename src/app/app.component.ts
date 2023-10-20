import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    Notiflix.Notify.init({
      width: '380px',
      position: 'right-top',
      borderRadius: '8px',
      fontFamily: 'Inter',
      fontSize: '14px',
      useIcon: true,
      success: {
        background: '#FFF',
        textColor: 'rgba(17, 24, 39, 1)',
        notiflixIconColor: 'green',
      },
    });
  }
}
