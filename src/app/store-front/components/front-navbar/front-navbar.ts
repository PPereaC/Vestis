import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'front-navbar',
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  themeService = inject(ThemeService);
}
