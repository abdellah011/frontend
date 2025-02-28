export class User {
    id: number;
    name: string;
    email: string;
    department: string;
    Password:string;
    constructor(
      id: number,
      name: string,
      email: string,
      department: string,
      Password:string,

    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.department = department;
      this.Password=Password;

      
    }
  }
  