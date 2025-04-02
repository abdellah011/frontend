import { Component, OnInit } from '@angular/core';
import { DashboardService, UserStats } from '../../services/dashboard/dash-board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  stats!: UserStats;
  historyStats: UserStats[] = [];

  // Données pour graphiques
  data: any[] = [];
  lineChartData: any[] = [];
  roleData: any[] = [];

  totalUsers: number = 0;
  totalAdmins: number = 0;
  view: [number, number] = [700, 400];

  // Schémas de couleurs personnalisés
  colorSchemePie = {
    domain: ['#7367F0', '#28C76F'] // Pie (connectés/déconnectés)
  };

  colorSchemeLine = {
    domain: ['#FF9F43'] // Courbe (utilisateurs connectés)
  };

  colorSchemeRoles = {
    domain: ['#0D6EFD', '#FFC107'] // Administrateurs / Utilisateurs
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // Stats utilisateurs actuelles (connectés / déconnectés)
    this.dashboardService.getUserStats().subscribe(res => {
      this.stats = res;
      this.preparePieChart();
    });

    // Historique des connexions utilisateurs (courbe)
    this.dashboardService.getUserStatsHistory().subscribe(history => {
      this.historyStats = history;
      this.prepareLineChart();
    });

    // Répartition des utilisateurs par rôle (admin/utilisateur)
    this.dashboardService.getUserRolesStats().subscribe(res => {
      this.roleData = res;
    });
    this.dashboardService.getUsersAdminsCount().subscribe(res => {
      this.totalUsers = res.totalUsers;
      this.totalAdmins = res.totalAdmins;
    });
  }

  preparePieChart() {
    this.data = [
      { name: 'Connectés', value: this.stats.connectedUsers },
      { name: 'Déconnectés', value: this.stats.disconnectedUsers }
    ];
  }

  prepareLineChart() {
    this.lineChartData = [
      {
        name: 'Utilisateurs Connectés',
        series: this.historyStats.map(h => ({
          name: new Date(h.date).toLocaleDateString(),
          value: h.connectedUsers
        }))
      }
    ];
  }
}
