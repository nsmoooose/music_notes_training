export class Scale {
    constructor(id, treble_notes, bass_notes) {
        this.id = id;
        this.treble_notes = treble_notes;
        this.bass_notes = bass_notes;
    }

    in_scale(note) {

    }
}

function generate_scales() {
    let scales = [
        new Scale("♮", [], []),

        new Scale("1♯", ["F5♯"], ["F3♯"]),
        new Scale("2♯", ["F5♯", "C5♯"], ["F3♯", "C3♯"]),
        new Scale("3♯", ["F5♯", "C5♯", "G5♯"], ["F3♯", "C3♯", "G3♯"]),
        new Scale("4♯", ["F5♯", "C5♯", "G5♯", "D5♯"], ["F3♯", "C3♯", "G3♯", "D3♯"]),
        new Scale("5♯", ["F5♯", "C5♯", "G5♯", "D5♯", "A4♯"], ["F3♯", "C3♯", "G3♯", "D3♯", "A2♯"]),
        new Scale("6♯", ["F5♯", "C5♯", "G5♯", "D5♯", "A4♯", "E5♯"], ["F3♯", "C3♯", "G3♯", "D3♯", "A2♯", "E3♯"]),

        new Scale("1♭", ["B4♭"], ["B2♭"]),
        new Scale("2♭", ["B4♭", "E5♭"], ["B2♭", "E3♭"]),
        new Scale("3♭", ["B4♭", "E5♭", "A4♭"], ["B2♭", "E3♭", "A2♭"]),
        new Scale("4♭", ["B4♭", "E5♭", "A4♭", "D5♭"], ["B2♭", "E3♭", "A2♭", "D3♭"]),
        new Scale("5♭", ["B4♭", "E5♭", "A4♭", "D5♭", "G4♭"], ["B2♭", "E3♭", "A2♭", "D3♭", "G2♭"]),
        new Scale("6♭", ["B4♭", "E5♭", "A4♭", "D5♭", "G4♭", "C5♭"], ["B2♭", "E3♭", "A2♭", "D3♭", "G2♭", "C3♭"]),
    ];

    let result = {};
    for(let scale of scales) {
        result[scale.id] = scale;
    }
    return result;
}

export const Scales = generate_scales();
