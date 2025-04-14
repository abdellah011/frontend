import { Component } from '@angular/core';
import { AddFileService } from 'app/services/addFile/add-file.service';


@Component({
  selector: 'add_File',
  templateUrl: './add_File.component.html',
})
export class add_FileComponent {
  selectedFile: File | null = null;

  response: {
    full_text: string,
    category: string,
    id: string
  } | null = null;

  isLoading = false;
  hasError = false;

  constructor(
    private addFileService: AddFileService,) {}
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    this.isLoading = true;

    // First, call your FastAPI endpoint to process the image and get text, category, and matricule.
    this.addFileService.uploadImage(this.selectedFile).subscribe(
      (data) => {
        // data devrait contenir, entre autres, la catégorie générée par FastAPI.
        console.log('Réponse de FastAPI:', data);
        this.response = {
          full_text: data.full_text,
          category: data.category,
          id: data.id
        };
    
        // Envoi de la mutation GraphQL pour enregistrer l'info
        this.addFileService.saveToGraphQL(this.selectedFile!).subscribe(
          () => {
            this.isLoading = false;
            console.log('Fichier enregistré en BDD');

          },
          (err) => {
            this.isLoading = false;
            this.hasError = true;
            console.error("Erreur GraphQL :", err);

          }
        );
      },
      (error) => {
        console.error("Erreur FastAPI :", error);
        this.isLoading = false;
        this.hasError = true;
      }
    );
    
  
  }
}
