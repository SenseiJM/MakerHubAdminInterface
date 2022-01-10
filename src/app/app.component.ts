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
      // {
      //   label: "Joueurs",
      //   icon: "fas fa-users",
      //   routerLink: ['joueur-admin']
      // },
      {
        label: "Annonces",
        icon: "fas fa-bell",
        routerLink: ['annonce-admin']

      },
      {
        label: "Stages",
        icon: "fas fa-table-tennis",
        routerLink: ['stage-admin']

      },
      {
        label: "Soupers",
        icon: "fas fa-wine-glass-alt",
        routerLink: ['souper-admin']
      },
      // {
      //   label: "Compétitions",
      //   icon: "fas fa-trophy"
      // },
      // {
      //   label: "Équipes",
      //   icon: "fas fa-sitemap"
      // }
    ];

  }
}
