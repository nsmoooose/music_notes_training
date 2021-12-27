export class Scale {
    constructor(id, name, treble_notes, bass_notes) {
        this.id = id;
        this.name = name;
        this.treble_notes = treble_notes;
        this.bass_notes = bass_notes;
    }

    in_scale(note) {

    }
}

function generate_scales() {
    let scales = [
        new Scale("♮", "C major", [], []),

        new Scale("1♯", "G major", ["F5♯"], ["F3♯"]),
        new Scale("2♯", "D major", ["F5♯", "C5♯"], ["F3♯", "C3♯"]),
        new Scale("3♯", "A major", ["F5♯", "C5♯", "G5♯"], ["F3♯", "C3♯", "G3♯"]),
        new Scale("4♯", "E major", ["F5♯", "C5♯", "G5♯", "D5♯"], ["F3♯", "C3♯", "G3♯", "D3♯"]),
        new Scale("5♯", "B major", ["F5♯", "C5♯", "G5♯", "D5♯", "A4♯"], ["F3♯", "C3♯", "G3♯", "D3♯", "A2♯"]),
        new Scale("6♯", "F♯ major", ["F5♯", "C5♯", "G5♯", "D5♯", "A4♯", "E5♯"], ["F3♯", "C3♯", "G3♯", "D3♯", "A2♯", "E3♯"]),

        new Scale("1♭", "F major", ["B4♭"], ["B2♭"]),
        new Scale("2♭", "B♭ major", ["B4♭", "E5♭"], ["B2♭", "E3♭"]),
        new Scale("3♭", "E♭ major", ["B4♭", "E5♭", "A4♭"], ["B2♭", "E3♭", "A2♭"]),
        new Scale("4♭", "A♭ major", ["B4♭", "E5♭", "A4♭", "D5♭"], ["B2♭", "E3♭", "A2♭", "D3♭"]),
        new Scale("5♭", "D♭ major", ["B4♭", "E5♭", "A4♭", "D5♭", "G4♭"], ["B2♭", "E3♭", "A2♭", "D3♭", "G2♭"]),
        new Scale("6♭", "Gb major", ["B4♭", "E5♭", "A4♭", "D5♭", "G4♭", "C5♭"], ["B2♭", "E3♭", "A2♭", "D3♭", "G2♭", "C3♭"]),
    ];

    let result = {};
    for (let scale of scales) {
        result[scale.id] = scale;
    }
    return result;
}

export const Scales = generate_scales();
