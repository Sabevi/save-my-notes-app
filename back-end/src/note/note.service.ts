import { Note } from './note';

export interface NoteService {
    add(note:string): Note;
    getById(id: number): Note | null;
}