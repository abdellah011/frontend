import { Component, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from 'app/services/categorie/categorie.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
})
export class CategorieComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Liste des catégories
  categories: string[] = [
    'facture',
    'document administratif',
    'finance',
    'commerce',
    'sciences',
    'informatique'
  ];

  // Catégorie sélectionnée
  selectedCategorie: string = '';

  // Données + source pour Angular Material
  fichiers: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  // Champs de filtrage
  filterNom: string ='';
  filterId: string = '';
  filterMatricule: string = '';
  filterDate: string = '';

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
   
  }
  

  // Lorsqu'on sélectionne une catégorie
  selectCategorie(categorie: string) {
    this.selectedCategorie = categorie;
    this.fetchFichiersForCategorie(categorie);
  }

  // Récupération des fichiers via GraphQL
  fetchFichiersForCategorie(categorie: string) {
    this.categorieService.getFichiersByCategorie(categorie).subscribe(
      (result: any) => {
        // ✅ Cloner les fichiers pour éviter de modifier un tableau readonly
        const fichiersNonTries = [...(result?.data?.fichiers || [])];
  
        // ✅ Trier du plus récent au plus ancien
        fichiersNonTries.sort((a, b) => new Date(b.dateAjout).getTime() - new Date(a.dateAjout).getTime());
  
        this.fichiers = fichiersNonTries;
        this.dataSource = new MatTableDataSource<any>(this.fichiers);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Erreur de chargement des fichiers :', error);
      }
    );
  }
  

  // Filtres
  appliquerFiltres() {
    this.dataSource.filter = `${this.filterNom} ${this.filterId}`.toLowerCase();
  
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const idFormatted = 'doc-' + ('000' + data.id).slice(-3);
      return (
        data.nom.toLowerCase().includes(this.filterNom.toLowerCase()) &&
        idFormatted.toLowerCase().includes(this.filterId.toLowerCase())
      );
    };
  }
  

  // URL pour voir ou télécharger le fichier
  getFileUrl(nomFichier: string): string {
    return `http://localhost:5280/uploads/${nomFichier}`;
  }
  downloadFile(fileName: string) {
    const url = this.getFileUrl(fileName);
  
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('File not found');
        }
        return res.blob();
      })
      .then(blob => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(() => {
        alert("Échec du téléchargement du fichier.");
      });
  }
  
  

  // Supprimer un fichier
  supprimerFichier(fichierId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) {
      this.categorieService.supprimerFichierParId(fichierId).subscribe({
        next: () => {
          alert("Fichier supprimé avec succès !");
          this.fichiers = this.fichiers.filter(f => f.id !== fichierId);
          this.dataSource.data = this.fichiers;
        },
        error: (error) => {
          console.error('Erreur suppression :', error);
          alert("Erreur lors de la suppression du fichier.");
        }
      });
    }
  }
}
