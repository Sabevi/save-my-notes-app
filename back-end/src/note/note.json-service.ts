import { Note } from './note';
import { NoteService } from './note.service';
import fs from 'fs';

export class UserJSONService implements NoteService {
    private filePath: string = './src/database/users.json';

    private readJSONFile(): Note [] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        if (!data || data.length === 0) {
            return [];
        }
        return JSON.parse(data) as Note [];
    }

    add(note: string): Note{
        const notes: Note[] = this.readJSONFile();
        const newNote = {
            id: Math.floor(Math.random() * 10000),
            note: note, 
        };
        notes.push(newNote);
        fs.writeFileSync(this.filePath, JSON.stringify(notes));
        return newNote;
    }

    getById(id: number): Note | null {
        const notes: Note[] = this.readJSONFile();
        const note = notes.find(note => note.id === id);
        return note || null;
    }
}
