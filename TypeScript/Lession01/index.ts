class Student {
  fullname: string;
  constructor(
    public firstName: string,
    public middle: string,
    public lastName: string
  ) {
    this.fullname = firstName + " " + middle + " " + lastName;
  }
}
interface Person {
  firstName: string;
  lastName: string;
}
function Alo(person: Person) {
  return "Hihi" + person.firstName + person.lastName;
}
let user = new Student("Nguyen", "Van", "A");

document.body.textContent = Alo(user);
