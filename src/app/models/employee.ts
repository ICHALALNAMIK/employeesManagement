export class Employee {
    
        public id?: number;
        public fname?: string;
        public lastName?: string;
        public age?: number;
        public salary?: number;
      
        constructor(id?: number, fname?: string, lastName?: string, age?: number, salary?: number) {
          this.id = id;
          this.fname = fname;
          this.lastName = lastName;
          this.age = age;
          this.salary = salary;
        }
      
      
}
