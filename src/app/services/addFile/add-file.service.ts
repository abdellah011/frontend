import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class AddFileService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:8000/extract', formData);
  }

  saveToGraphQL(file: File) {
    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation uploadFile($file: Upload!) {
          uploadFichier(file: $file) {
            nom
            type
            categorie
            fullText
            dateAjout
            id
          }
        }
      `,
      variables: {
        file: null
      }
    }));
  
    formData.append('map', JSON.stringify({ "0": ["variables.file"] }));
    formData.append('0', file);
  
    return this.http.post<any>('http://localhost:5280/graphql', formData);
  }
}
