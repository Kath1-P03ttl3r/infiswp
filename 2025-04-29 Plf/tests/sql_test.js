//import { assert, assertEquals, fail } from "@std/assert";
import * as sqlite from "jsr:@db/sqlite";
//import { assertArrayIncludes } from "@std/assert/array-includes";

const dbname = "w3schools.sqlite";
const db = new sqlite.Database(dbname);

function checkSql(sql, filename) {
    if (!sql) {
        throw new Error(`${filename} ist leer`);
    }
    if (!sqlite.isComplete(sql)) {
        throw new Error(`${filename} enthält fehlerhaftes sql`);
    }
}

function getResult(tc) {
    try {
        const stat = Deno.statSync(tc.name);
        if (!stat.isFile) {
            throw new Error(`${tc.name} ist kein File`);
        }
    } catch (e) {
        fail(e.message);
    }
    const sql = Deno.readTextFileSync(tc.name);
    checkSql(sql, tc.name);
    const stmt = db.prepare(sql);
    return stmt.all();
}

/*function runFile(tc) {
    const sql = Deno.readTextFileSync(tc.name);
    checkSql(sql, tc.name);
    db.exec(sql);
}
    */

Deno.test("a.sql", (tc) => {
    const result = getResult(tc);
    const names = result.map((row) => row.CustomerName);
    assertArrayIncludes(names, ["Ernst Handel", "Piccolo und mehr"]);
});
Deno.test("b.sql", (tc) => {
    const result = getResult(tc);
    assertEquals(result.length, 91);
    const shorts = result.map((row) => `${row.CustomerName} ${row.OrderCount}`);
    assertArrayIncludes(shorts, [
        "Vaffeljernet 2",
        "White Clover Markets 2",
        "Trail's Head Gourmet Provisioners 0",
    ]);
    //assertArrayIncludes(names, ["Ernst Handel", "Piccolo und mehr"]);
});
Deno.test("c.sql", (tc) => {
    const result = getResult(tc);
    assertEquals(result.length, 3);
    assertEquals(result, [
        {
            Price: 263.5,
            ProductName: "Côte de Blaye",
        },
        {
            Price: 123.79,
            ProductName: "Thüringer Rostbratwurst",
        },
        {
            Price: 97,
            ProductName: "Mishi Kobe Niku",
        },
    ]);
});
Deno.test("d.sql", (tc) => {
    const result = getResult(tc);
    assertEquals(result.length, 1);
    assertEquals(result, [
        {
            FirstName: "Adam",
            LastName: "West",
        },
    ]);
});
