# 2ahwii plf 2025-04-29

## themen: javascript klassen, sql joins

### Task 1: Erstellung und export der Klasse "Frage"

"export class"

### Task 2: Constructor

implentiere die constructor methode und speichere die Argumente in Attributen der Klasse

### Task 3: Parameterprüfung constructor

Stelle sicher, dass

- 3 "arguments" an den constructor übergeben werden.
- das erste und dritte argument ein "string" ist (typeof)
- das zweite Argument ein array ist und nicht leer

Im Fehlerfall: "throw"

### Task 4: Plausibilitätstest

Die Frage bekommt als parameter 2 eine Liste an Optionen, die richtige davon
wird in parameter 3 übergeben. Stelle nun sicher, dass nur ein gültiges
Frage-Objekt erzeugt werden kann. (Parameter 3: string muss in Parameter
2: string[] enthalten sein). Tipp: "includes"

### Task 5: Klasse `Quiz`

exportiere nun eine weitere Klasse: "Quiz"

### Task 6: Parameterprüfung Quiz constructor: 1 argument

Werfe nun Fehler, wenn die "arguments" des constructors nicht Länge 1 haben.

### Task 7: Einlesen von einer .json Datei im Quiz constructor

... in das Array "Quiz.fragen". `new Quiz("fragen.json")` sollte nun die Datei
einlesen. Erinnerung: `Deno.readTextFileSync(fileName)` und `JSON.parse(json)`.

## Teil SQL (w3schools.sqlite)

### Task 8 (a.sql): Österreichische Kunden

Gib den CustomerName aller Customers aus, die in Country "Austria" sind.

### Task 9 (b.sql)

Gib jeden CustomerName sowie die Anzahl seiner Bestellungen (als "OrderCount") aus.
Inkludiere auch die Kunden mit keiner Bestellung!

### Task 10 (c.sql)

Gib aus der Producs Tabelle "ProductName" und "Price" der 3 teuersten Produkte
aus und sortiere absteigend nach Price.

### Task 11 (d.sql)

Gib "FirstName" sowie "LastName" aller Employees aus, welche keinen einzigen Order
bearbeitet haben!
