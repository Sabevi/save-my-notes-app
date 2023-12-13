import { Note } from './note';
import { NoteService } from './note.service';

export class NoteController {
  constructor(private noteService: NoteService) {}

  async getAll(): Promise<{ id: number; note: string }[]> {
    const notes = await this.noteService.getAll();
    return notes.map((note) => {
      const parsedNote = JSON.parse(note.note);
      const noteContent = Array.isArray(parsedNote) ? parsedNote.join(', ') : parsedNote;
      return { id: note.id, note: noteContent };
    });
  }

  async getById(id: number): Promise<Note | null> {
    if (!Number.isInteger(id)) {
      throw new Error('Id should be an integer');
    }
    if (id < 0) {
      throw new Error('Id should be positive');
    }
    return await this.noteService.getById(id);
  }

  async add(note: string[]): Promise<Note> {
    if (note.length === 0 || note.every((item) => item === '')) {
      throw new Error('The note is empty');
    }
    return await this.noteService.add(note);
  }

  async update(id: number, note: string[]): Promise<Note | null> {
    if (!Number.isInteger(id)) {
      throw new Error('Id should be an integer');
    }
    if (id < 0) {
      throw new Error('Id should be positive');
    }
    if (note.length === 0 || note.every((item) => item === '')) {
      throw new Error('The note is empty');
    }
    const updatedNote = await this.noteService.update(id, note);

    if (!updatedNote) {
      throw new Error(`Note with id ${id} not found`);
    }

    return updatedNote;
  }

  async delete(id: number): Promise<Note[] | null> {
    if (!Number.isInteger(id)) {
      throw new Error('Id should be an integer');
    }
    if (id < 0) {
      throw new Error('Id should be positive');
    }
    return await this.noteService.delete(id);
  }
}
