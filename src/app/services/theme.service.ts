import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal<boolean>(false);
  isDark = this.isDarkMode.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.set(false);
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme();
    }
  }

  private applyTheme(): void {
    const html = document.documentElement;
    if (this.isDarkMode()) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'vestis-dark');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'vestis');
    }
  }
}
