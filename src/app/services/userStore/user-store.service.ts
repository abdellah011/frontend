import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

private fullname$ =new BehaviorSubject<string>("");
private role$ =new BehaviorSubject<string>("");


  constructor() { }
// ✅ Récupérer le nom d'utilisateur sous forme d'Observable
public getFullName() {
  return this.fullname$.asObservable();
  
}
public getRole(){
  return this.role$.asObservable();
}

// ✅ Mettre à jour le nom d'utilisateur
public setFullName(fullname: string) {

  this.fullname$.next(fullname); // 🔥 Correction ici : on met à jour la valeur
}
public setRole(role: string) {

  this.role$.next(role); 
}

}
