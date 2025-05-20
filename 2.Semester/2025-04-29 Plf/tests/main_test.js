import {
    assert,
    assertEquals,
    assertFalse,
    assertNotEquals,
    assertThrows,
} from "@std/assert";
const imp = Deno.env.get("IMPORT");

import * as plf from "../plf.js";
import * as grg from "../grg.js";

let urxn;

if (imp.includes("plf")) {
    urxn = plf;
} else if (imp.includes("grg")) {
    urxn = grg;
} else {
    console.error("Invalid import option. Use 'plf' or 'main'.");
    Deno.exit(1);
}

Deno.test("Class Frage exists", () => {
    assertEquals(typeof urxn.Frage, "function", "Frage ist keine Klasse");
    assert(
        urxn.Frage instanceof Function,
        "Frage ist keine Klasse",
    );
});
Deno.test("constructor takes 3 arguments", () => {
    const frage1 = new urxn.Frage("Frage", ["Option1", "Option2"], "Option1");
    assertEquals(frage1.frage, "Frage");
    assertEquals(frage1.optionen, ["Option1", "Option2"]);
    assertEquals(frage1.antwort, "Option1");
    const frage2 = new urxn.Frage("Frage2", ["OptionA", "OptionB"], "OptionB");
    assertEquals(frage2.frage, "Frage2");
    assertEquals(frage2.optionen, ["OptionA", "OptionB"]);
    assertEquals(frage2.antwort, "OptionB");
});
Deno.test("constructor throws on false arguments", () => {
    assert(urxn.Frage);
    assertThrows(() => {
        new urxn.Frage();
    });
    assertThrows(() => {
        new urxn.Frage("Frage");
    });
    assertThrows(() => {
        new urxn.Frage("Frage", ["Option1", "Option2"]);
    });
    assertThrows(() => {
        new urxn.Frage("Frage", ["Option1", "Option2"], 123);
    });
});
Deno.test("constructor throws on not included antwort", () => {
    assert(urxn.Frage);
    assertThrows(() => {
        new urxn.Frage("Frage", ["Option1", "Option2"], "Option3");
    });
    assertThrows(() => {
        new urxn.Frage("Frage", ["Option1", "Option2"], "Option4");
    });
});
Deno.test("class Quiz exists", () => {
    assertEquals(typeof urxn.Quiz, "function", "Quiz ist keine Klasse");
    assert(
        urxn.Quiz instanceof Function,
        "Quiz ist keine Klasse",
    );
});
Deno.test("constructor takes exactly argument", () => {
    new urxn.Quiz("fragen.json");
    assertThrows(() => {
        new urxn.Quiz();
    });
    assertThrows(() => {
        new urxn.Quiz("fragen.json", "extra");
    });
});
Deno.test("fragen is an array of Frage objects", () => {
    const quiz = new urxn.Quiz("fragen.json");
    assertEquals(Array.isArray(quiz.fragen), true, "fragen ist kein Array");
    assertEquals(
        quiz.fragen.length > 0,
        true,
        "fragen ist ein leeres Array",
    );
    for (const frage of quiz.fragen) {
        assert(
            frage instanceof urxn.Frage,
            "fragen enthält kein Frage-Objekt",
        );
    }
});
