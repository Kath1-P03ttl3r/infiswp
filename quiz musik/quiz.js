// Klasse Frage erstellen
import { fragen } from "./fragen.js"; // Importiere die Fragen aus der JSON-Datei
globalThis.fragen = fragen; // Globales Array für die Fragen

import { Frage } from "./frage.js"; // Importiere die Klasse Frage

class App {
    constructor() {
        this.domElements = {
            startButton: document.getElementById("start-button"),
            questionContainer: document.getElementById("question-container"),
            questionText: document.getElementById("question"),
            optionsList: document.getElementById("options"),
            weiterBtn: document.getElementById("weiter-btn"),
            restartBtn: document.getElementById("restart-btn"),
            questionNumber: document.getElementById("question-number"),
            endcontainer: document.getElementById("endcontainer"),
            correctCountElement: document.getElementById("correct-count"),
            wrongCountElement: document.getElementById("wrong-count"),
            timerDisplay: document.getElementById("timer"),
            answerFeedback: document.getElementById("answer-feedback"),
        };
        this.state = {
            currentQuestionIndex: 0,
            correctquestions: 0,
            wrongquestions: 0,
        };
        this.questionobjects = fragen.map((e) =>
            new Frage(e.frage, e.optionen, e.antwort)
        );
    }
    show_endpage() {
        this.domElements.questionContainer.classList.add("hidden");
        this.domElements.weiterBtn.classList.add("hidden");
        this.domElements.restartBtn.classList.remove("hidden");
        this.domElements.endcontainer.classList.remove("hidden");
    }
    // Timer starten
    startTimer() {
        this.state.startTime = Date.now();
        this.state.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.state.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.domElements.timerDisplay.textContent = `${
                minutes.toString().padStart(2, "0")
            }:${seconds.toString().padStart(2, "0")}`;
        }, 1000);
    }

    // Timer stoppen
    stopTimer() {
        clearInterval(this.state.timerInterval);
        this.state.timerInterval = null;
        this.domElements.timerDisplay.textContent = "00:00";
    }

    // Timer zurücksetzen und starten
    resetTimer() {
        this.stopTimer();
        this.startTimer();
    }

    // Frage rendern
    renderQuestion() {
        const frageObj = this.questionobjects[this.state.currentQuestionIndex];
        this.domElements.questionText.textContent = frageObj.frage;
        this.domElements.optionsList.innerHTML = "";
        this.domElements.answerFeedback.textContent = ""; // Clear previous feedback

        frageObj.optionen.forEach((option, index) => {
            const container = document.createElement("div"); // Wrapper für Radio + Label
            container.classList.add("option-container");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "frageOption";
            radio.value = option;
            radio.id = `option-${index}`;

            const label = document.createElement("label");
            label.setAttribute("for", radio.id);
            label.textContent = option;

            container.appendChild(radio);
            container.appendChild(label);
            this.domElements.optionsList.appendChild(container);
        });

        this.domElements.questionNumber.textContent = `${
            this.state.currentQuestionIndex + 1
        }/${this.questionobjects.length}`;
        this.domElements.correctCountElement.textContent =
            `Correct: ${this.state.correctquestions}`;
        this.domElements.wrongCountElement.textContent =
            `Wrong: ${this.state.wrongquestions}`;
     const options = this.domElements.optionsList.querySelectorAll('input[type="radio"]');
        options.forEach(radio => radio.disabled = false);
        }

    // Quiz starten
    init() {
        this.domElements.startButton.addEventListener(
            "click",
            this.start.bind(this),
        );
        this.domElements.weiterBtn.addEventListener(
            "click",
            this.weiter.bind(this),
        );
        this.domElements.restartBtn.addEventListener(
            "click",
            this.restart.bind(this),
        );
    }

    start() {
        this.domElements.startButton.classList.add("hidden");
        this.domElements.questionContainer.classList.remove("hidden");
        this.domElements.weiterBtn.classList.remove("hidden");
        this.domElements.restartBtn.classList.remove("hidden");
        this.domElements.correctCountElement.textContent =
            `Correct: ${this.state.correctquestions}`;
        this.domElements.wrongCountElement.textContent =
            `Wrong: ${this.state.wrongquestions}`;
        this.renderQuestion(
            this.questionobjects[this.state.currentQuestionIndex],
        );
        this.resetTimer(); // Timer starten
        this.domElements.endcontainer.classList.add("hidden");
    }

    weiter() {
        const selected = document.querySelector(
            'input[name="frageOption"]:checked',
        );
        
        if (!selected) {
            // If no option is selected, prevent proceeding and optionally give feedback
            this.domElements.answerFeedback.textContent = "Please select an answer!";
            this.domElements.answerFeedback.style.color = "orange";
            return; // Stop the function here
        }

        this.domElements.answerFeedback.textContent = "";
        this.domElements.weiterBtn.disabled = false;

        const userAnswer = selected.value;
        const currentFrage =
            this.questionobjects[this.state.currentQuestionIndex];
        if (currentFrage.pruefen(userAnswer)) {
             this.state.correctquestions++;
            // Hier wird der Text mit <strong> umschlossen
            this.domElements.answerFeedback.innerHTML = "<strong>Correct!</strong>";
            this.domElements.answerFeedback.style.color = "green";
        } else {
            this.state.wrongquestions++;
            this.domElements.answerFeedback.textContent = `Wrong! The correct answer was: "${currentFrage.antwort}"`;
            this.domElements.answerFeedback.style.color = "red";
        }
        
        const options = this.domElements.optionsList.querySelectorAll('input[type="radio"]');
        options.forEach(radio => radio.disabled = true);

        // Wait a moment before moving to the next question to allow feedback to be seen
        setTimeout(() => {
            this.state.currentQuestionIndex++;

            if (this.state.currentQuestionIndex < this.questionobjects.length) {
                this.renderQuestion(); // No need to pass the question object explicitly
            } else {
                 this.domElements.answerFeedback.textContent = ""; // Clear feedback here
                this.show_endpage();
                this.domElements.endcontainer.innerHTML = `<h2>Quiz Finished!</h2>
                    <p>You answered ${this.state.correctquestions}/${this.questionobjects.length} questions correct and ${this.state.wrongquestions}/${this.questionobjects.length} wrong.</p>
                    <p>Time: ${this.domElements.timerDisplay.textContent}</p>`;
                this.stopTimer();
            }
        }, 1500); // 1.5 second delay
    }

    gotoEnd() {
        this.state.currentQuestionIndex = this.questionobjects.length - 1; // Setze den Index auf die letzte Frage
        this.renderQuestion();
    }
    // Quiz neu starten
    restart() {
        this.domElements.questionContainer.classList.remove("hidden");
        this.domElements.weiterBtn.classList.remove("hidden");
        this.domElements.restartBtn.classList.remove("hidden");
        this.state.currentQuestionIndex = 0;
        this.domElements.endcontainer.classList.add("hidden");
        this.domElements.answerFeedback.textContent = ""; // Clear feedback on restart

        this.state.correctquestions = 0;
        this.state.wrongquestions = 0;
        this.domElements.correctCountElement.textContent =
            `richtig: ${this.state.correctquestions}`;
        this.domElements.wrongCountElement.textContent =
            `falsch: ${this.state.wrongquestions}`;

        this.state.correctquestions = 0;
        this.state.wrongquestions = 0;

        this.domElements.questionNumber.textContent =
            `1/${this.questionobjects.length}`;
        this.renderQuestion();

         this.resetTimer(); // Timer zurücksetzen und starten
    }
}

globalThis.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    globalThis.app = app; // Globales App-Objekt
    app.init();
});