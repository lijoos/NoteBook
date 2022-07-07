export class Note{
    pageID!: string;
    content!: string;
    constructor(pageID: string, content: string) {
        this.content = content;
        this.pageID = pageID;
    }
}
export class NoteBookItem{
    noteBookItemID!: number;
    notes!: Note[];
    constructor(noteBookItemID: number, notes: Note[]) {
        this.noteBookItemID = noteBookItemID;
        this.notes = notes;
    }
}