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
            `Correct ${this.state.correctquestions},`;
        this.domElements.wrongCountElement.textContent =
            `Wrong ${this.state.wrongquestions},`;
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
            this.domElements.weiterBtn.disabled = true; // Kein Ergebnis ausgewählt, Button deaktiviert und nichts weiter tun
        }

        this.domElements.weiterBtn.disabled = false;

        const userAnswer = selected.value;
        const currentFrage =
            this.questionobjects[this.state.currentQuestionIndex];

        if (currentFrage.pruefen(userAnswer)) {
            this.state.correctquestions++;
        } else {
            this.state.wrongquestions++;
        }

        this.state.currentQuestionIndex++;

        if (this.state.currentQuestionIndex < this.questionobjects.length) { // Es gibt noch Fragen
            this.renderQuestion(
                this.questionobjects[this.state.currentQuestionIndex],
            );
        } else {
            this.show_endpage();
            this.domElements.endcontainer.innerHTML = `<h2>Quiz Finished!</h2>
                <p>You answered ${this.state.correctquestions}/${this.questionobjects.length} questions correct and ${this.state.wrongquestions}/${this.questionobjects.length} wrong.</p>
                <p>time: ${this.domElements.timerDisplay.textContent}</p>`;
            this.stopTimer();
        }
    } // <-- This closes the weiterBtn.addEventListener function
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
        this.renderQuestion(
            this.questionobjects[this.state.currentQuestionIndex],
        );
        this.resetTimer(); // Timer zurücksetzen und starten
    }
}

globalThis.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    globalThis.app = app; // Globales App-Objekt
    app.init();
});
