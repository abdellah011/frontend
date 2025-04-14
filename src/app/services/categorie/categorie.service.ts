import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private apollo: Apollo) {}
  
  getFichiersByCategorie(categorie: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetFichiersByCategorie($categorie: String!) {
          fichiers(where: { categorie: { eq: $categorie } }) {
            id      
            nom
            matricule
            dateAjout
            categorie
          }
        }
      `,
      variables: { categorie }
    });
  }
  
  supprimerFichierParId(fichierId: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation SupprimerFichierParId($fichierId: Int!) {
          supprimerFichierParId(fichierId: $fichierId)
        }
      `,
      variables: { fichierId }
    });
  }
  
  
  
  
}
