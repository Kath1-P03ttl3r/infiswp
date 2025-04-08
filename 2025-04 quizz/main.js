class Person {
    #name;
    #age;
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }
    get age() {
        return this.#age;
    }
    greet() {
        console.log(
            `Hello, my name is ${this.#name} and I am ${this.#age} years old.`,
        );
    }
}
const salima = new Person("Salima", 15);
const ben = new Person("Ben", 14);
salima.greet();
ben.greet();
console.log(`Gemeinsames Alter: ${salima.age + ben.age}`);