import { InstrumentPiano } from "./instrument_piano.js"
import { InstrumentNotes } from "./instrument_notes.js"
import { Staff } from "./staff.js"

let g_instrument = null;
let g_staff = null;

let answers_correct = 0;
let answers_fail = 0;

class Question {
    constructor(note, level) {
        /* Scientific pitch notation:
           https://en.wikipedia.org/wiki/Scientific_pitch_notation  */
        this.note = note;
        /* Difficulty level of question. */
        this.level = level;
    }
}

let questions = [
    /*
    new Question("A0", 9),
    new Question("B0", 9),

    new Question("C1", 9),
    new Question("D1", 9),
    new Question("E1", 9),
    new Question("F1", 9),
    new Question("G1", 9),
    new Question("A1", 9),
    new Question("B1", 9),

    new Question("C2", 9),
    new Question("D2", 9),
    new Question("E2", 9),
    new Question("F2", 9),
    new Question("G2", 9),
    new Question("A2", 9),
    new Question("B2", 9),

    new Question("C3", 2),
    new Question("D3", 2),
    new Question("E3", 2),
    new Question("F3", 2),
    new Question("G3", 2),
    new Question("A3", 2),
    new Question("B3", 2),
*/
    new Question("C4", 1),
    new Question("D4", 1),
    new Question("E4", 1),
    new Question("F4", 1),
    new Question("G4", 1),
    new Question("A4", 1),
    new Question("B4", 1),
/*
    new Question("C5", 3),
    new Question("D5", 3),
    new Question("E5", 3),
    new Question("F5", 3),
    new Question("G5", 3),
    new Question("A5", 3),
    new Question("B5", 3),

    new Question("C6", 9),
    new Question("D6", 9),
    new Question("E6", 9),
    new Question("F6", 9),
    new Question("G6", 9),
    new Question("A6", 9),
    new Question("B6", 9),

    new Question("C7", 9),
    new Question("D7", 9),
    new Question("E7", 9),
    new Question("F7", 9),
    new Question("G7", 9),
    new Question("A7", 9),
    new Question("B7", 9),

    new Question("C8", 9),
    */
];

let current_question = questions[Math.floor(Math.random() * questions.length)];

function $(id) {
    return document.getElementById(id);
}

function draw(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "60px Arial";
    ctx.lineWidth = 1;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#00bb00";
    ctx.fillText("Correct: " + answers_correct, 20, 70);
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Fails: " + answers_fail, 20, 160);

    if(current_question) {
        g_staff.draw_tone(current_question.note);
    }
    g_staff.draw();
    g_instrument.draw();
}

window.addEventListener('load', (event) => {
    let canvas = $("canvas");
    g_instrument = new InstrumentPiano(canvas);
    g_instrument = new InstrumentNotes(canvas);
    g_staff = new Staff(canvas);

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const answer = g_instrument.click(x, y);
        if(answer == null) {
            return;
        }
        if(answer == current_question.note[0]) {
            current_question = questions[Math.floor(Math.random() * questions.length)];
            answers_correct++;
        } else {
            answers_fail++;
        }
        draw(canvas);
    });
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        /*
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x + " y: " + y)
        */
    });
    draw(canvas);
});
