import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(protected translateService: TranslateService) {
    translateService.setDefaultLang('tr');
    this.translateService.getBrowserLang() === 'en' ? translateService.use('en') : translateService.use('tr');
  }
}
