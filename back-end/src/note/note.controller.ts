import { Note } from './note';
import { NoteService } from './note.service';

export class NoteController {
  constructor(private noteService: NoteService) {}

  async getAll(): Promise<Note[]> {
    return await this.noteService.getAll();
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

  async add(note: string): Promise<Note> {
    if (!note) {
      throw new Error('The note is empty');
    }
    return await this.noteService.add(note);
  }

  async update(id: number, note: string): Promise<Note | null> {
    if (!Number.isInteger(id)) {
      throw new Error('Id should be an integer');
    }
    if (id < 0) {
      throw new Error('Id should be positive');
    }
    if (!note) {
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
