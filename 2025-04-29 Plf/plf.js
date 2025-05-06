export class Frage {
    constructor(a, b, c) {
        this.antwort = c;
        this.optionen = b;
        this.frage = a;
        if (arguments.length != 3) {
            throw new Error();
        }

        if (typeof this.antwort != "string") {
            throw new Error();
        }

        if (typeof this.frage != "string") {
            throw new Error();
        }

        if (!Array.isArray(this.optionen) || this.optionen.length === 0) {
            throw new Error();
        }

        if (!this.optionen.includes(this.antwort)) {
            throw new Error();
        }
    }
}

export class Quiz {
    constructor(dateiname) {
        if (arguments.length !== 1) {
            throw new Error();
        }

        const inhalt = Deno.readTextFileSync(dateiname);
        const objectarray = JSON.parse(inhalt);
        this.fragen = objectarray.map(e => new Frage(e.frage, e.optionen, e.antwort))
    }
}
