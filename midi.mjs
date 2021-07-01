export const MidiConstants = {
    CHANNEL1_NOTE_OFF: 128,
    CHANNEL1_NOTE_ON: 144
};


function generate_midi_notes() {
    let answers = [
        "C",
        ["C♯", "D♭"],
        "D",
        ["D♯", "E♭"],
        "E",
        "F",
        ["F♯", "G♭"],
        "G",
        ["G♯", "A♭"],
        "A",
        ["A♯", "B♭"],
        "B"
    ];

    let result = {};

    /* A0 = 21 */
    const start_offset = 21 - answers.indexOf("A");
    for(let i = 21; i <= 108; i++ ) {
        let octave = Math.floor((i - start_offset) / answers.length);
        let note = (i - start_offset) % answers.length;

        /* TODO insert the octave in the note */
        result[i] = answers[note];
    }
    return result;
}

export const MidiPianoNotes = generate_midi_notes();
