import { Note } from './note';
import { NoteService } from './note.service';

export class NoteController {
    constructor(private noteService: NoteService) {}

    getAll(): Note[] {
        return this.noteService.getAll();
    }

    getById(id: number): Note | null {
        if (!Number.isInteger(id)) {
            throw new Error('Id should be an integer');
        }
        if (id < 0) {
            throw new Error('Id should be positive');
        }
        return this.noteService.getById(id);
    }

    add(note: string): Note {
        if (!note){
            throw new Error('The note is empty');
        }
        return this.noteService.add(note);
    }

    update(id: number, note: string): Note | null {
        if (!Number.isInteger(id)) {
            throw new Error('Id should be an integer');
        }
        if (id < 0) {
            throw new Error('Id should be positive');
        }
        if (!note){
            throw new Error('The note is empty');
        }
        return this.noteService.update(id, note);
    };

    delete(id: number): Note[] | null {
        if (!Number.isInteger(id)) {
            throw new Error('Id should be an integer');
        }
        if (id < 0) {
            throw new Error('Id should be positive');
        }
        return this.noteService.delete(id);
    };
}