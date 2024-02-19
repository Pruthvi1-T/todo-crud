import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css'; //bundle name
    }
  }
}
