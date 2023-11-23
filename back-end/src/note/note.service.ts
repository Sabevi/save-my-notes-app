import { Note } from './note';
export interface NoteService {
    getAll(): Promise<Note[]>;
    getById(id: number): Promise<Note | null>;
    add(note: string): Promise<Note>;
    update(id: number, note: string): Promise<Note | null>;
    delete(id: number): Promise<Note[] | null>;
}