import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator-for-dad';

  selectedTabPosition: number;
  tabs: any[] = [
    {
      key: 're-balancing',
      tab: '비중 계산',
    },
    {
      key: 'profit-and-loss',
      tab: '모의 스캘핑',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.setActive();
    });

  }

  private setActive() {
    const key = this.route.snapshot.children[0].url[0].path;
    const idx = this.tabs.findIndex((w) => w.key.startsWith(key));

    if (idx !== -1) {
      this.selectedTabPosition = idx;
    }
  }

  changeTab(tabs: any) {
    this.router.navigate([tabs.key]);
  }
}
