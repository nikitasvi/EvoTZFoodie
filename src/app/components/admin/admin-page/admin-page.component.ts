import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  public tab: TabType = 'users';
  public isEditRecipePage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isEditRecipePage =
          this.route.snapshot.firstChild?.routeConfig?.path === 'recipes/:id';
      }
    });
  }

  public switchTab(tab: TabType) {
    this.tab = tab;
  }
}

export type TabType = 'users' | 'recipes';
