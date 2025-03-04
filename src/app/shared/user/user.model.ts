export class User {
    id: number;
    name: string;
    email: string;
    department: string;
    Password:string;
    role:string;
    constructor(
      id: number,
      name: string,
      email: string,
      department: string,
      password:string,
      role:string,

    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.department = department;
      this.Password=password;
      this.role=role;

      
    }
  }
  