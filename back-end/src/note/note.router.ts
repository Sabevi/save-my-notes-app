import { Router } from 'express';
import { NoteController } from './note.controller';

export class NoteRouter {
    router = Router();

    constructor(private noteController: NoteController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/', (req, res, next) => {
            try {
                const result = this.noteController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.noteController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-note', (req, res, next) => {
            try {
                const result = this.noteController.add(req.body.note);
                res.status(201).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/update-note', (req, res, next) => {
            try {
                const result = this.noteController.update(req.body.id, req.body.note);
                res.status(201).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
