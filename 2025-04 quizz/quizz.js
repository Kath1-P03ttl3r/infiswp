/*const decoder = new TextDecoder('utf-8'); //Decoder Objekt
const data = Deno.readFileSync("fragen.json"); 
const jsonString = decoder.decode(data);
const jsonData = JSON.parse(jsonString);
jsonData.forEach((_) => {  //kan statt _ auch anderes verwenden
    console.log(_.frage); //function kriegt Element null dann eins und so weiter und wird auf Console ausgegeben
});
console.log(`Es gibt ${jsonData.length} Fragen.`);

const decoder = new TextDecoder('utf-8'); //Decoder Objekt
const data = Deno.readFileSync("fragen.json"); 
const jsonString = decoder.decode(data);
const jsonData = JSON.parse(jsonString);

let currentQuestionIndex = 0; // Track the current question index

// Function to display the current question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    if (currentQuestionIndex < jsonData.length) {  //.length gibt die Anzahl der Elemente in einem Array
        questionElement.textContent = jsonData[currentQuestionIndex].frage; // Display the current question
    } else {
        questionElement.textContent = "Keine weiteren Fragen."; // No more questions
    }
}

// Event listener for the "Nächste Frage" button
document.getElementById('next-button').addEventListener('click', () => {
    if (currentQuestionIndex < jsonData.length - 1) {
        currentQuestionIndex++; // Move to the next question
        displayQuestion(); // Display the next question
    } else {
        alert("Das ist die letzte Frage!"); // Alert for the last question
    }
});

// Initial call to display the first question
displayQuestion();*/

// Browser compatible version
let jsonData = []; // Stores loaded questions
let currentQuestionIndex = 0; // Tracks current question

// Load questions from JSON file when page loads
fetch('fragen.json')
    .then(data => {
        jsonData = data;
        displayQuestion(); // Show first question
    })
    .catch(error => {
        console.error('Error loading questions:', error);
        document.getElementById('question').textContent = 
            "Fehler beim Laden der Fragen.";
    });

// Displays current question
function displayQuestion() {
    const questionElement = document.getElementById('question');
    if (currentQuestionIndex < jsonData.length) {
        questionElement.textContent = jsonData[currentQuestionIndex].frage;
    } else {
        questionElement.textContent = "Keine weiteren Fragen.";
    }
}

// Handle next button clicks
document.getElementById('next-button').addEventListener('click', () => {
    if (currentQuestionIndex < jsonData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert("Das ist die letzte Frage!");
    }
});