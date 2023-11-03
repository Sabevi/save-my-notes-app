import { Note } from './note';
export interface NoteService {
    getAll(): Note[];
    getById(id: number): Note | null;
    add(note: string): Note;
    update(id: number, note: string): Note | null;
    delete(id: number): Note[] | null;
}