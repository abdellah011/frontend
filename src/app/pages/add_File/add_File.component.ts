import { Component } from '@angular/core';
import { addFileService } from 'app/services/addFile/add-file.service';
@Component({
  selector: 'add_File',
  templateUrl: './add_File.component.html',
})
export class add_FileComponent {
  selectedFile: File | null = null;
  response: any = null;
  isLoading = false;

  constructor(private addFileService:addFileService ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    this.isLoading = true;

    this.addFileService.uploadImage(this.selectedFile).subscribe(
      data => {
        this.response = data;
        this.isLoading = false;
      },
      error => {
        console.error("Erreur lors de l'envoi du fichier", error);
        this.isLoading = false;
      }
    );
  }
}
