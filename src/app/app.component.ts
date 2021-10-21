import { Component } from '@angular/core';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminApp';
  navigation!: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {

    this.primengConfig.ripple = true;

    this.navigation = [
      {
        label: "Joueurs",
        icon: 'pi pi-fw pi-users',
        routerLink: ['joueur-admin']
      },
      {
        label: "Annonces",
        icon: PrimeIcons.BELL,
        routerLink: ['annonce-admin']

      },
      {
        label: "Classements",
        icon: PrimeIcons.BARS,
        routerLink: ['classement-admin']

      },
      {
        label: "Stages",
        icon: PrimeIcons.CALENDAR,
        routerLink: ['stage-admin']

      }
    ];

  }
}
