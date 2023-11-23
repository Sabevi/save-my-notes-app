import { Note } from './note';
import { NoteService } from './note.service';

export class UserJSONService implements NoteService {
  async getAll(): Promise<Note[]> {
    return Note.findAll();
  }

  async getById(id: number): Promise<Note | null> {
    return Note.findByPk(id);
  }

  async add(note: string): Promise<Note> {
    return Note.create({ note });
  }

  async update(id: number, note: string): Promise<Note | null> {
    const noteToUpdate = await Note.findByPk(id);
    if (noteToUpdate) {
      noteToUpdate.set('note', note);
      await noteToUpdate.save();
    }
    return noteToUpdate;
  }

  async delete(id: number): Promise<Note[] | null> {
    const noteToDelete = await Note.findByPk(id);
    if (noteToDelete) {
      await noteToDelete.destroy();
    }
    return this.getAll();
  }
}
