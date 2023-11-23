import { Router } from 'express';
import { NoteController } from './note.controller';

export class NoteRouter {
    router = Router();

    constructor(private noteController: NoteController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.noteController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            try {
                const result = await this.noteController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-note', async (req, res, next) => {
            try {
                const result = await this.noteController.add(req.body.note);
                res.status(201).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/update-note', async (req, res, next) => {
            try {
                const result = await this.noteController.update(req.body.id, req.body.note);
                res.status(201).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/delete-note/:id', async (req, res, next) => {
            try {
                const result = await this.noteController.delete(parseInt(req.params.id));
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        })
    }
}
