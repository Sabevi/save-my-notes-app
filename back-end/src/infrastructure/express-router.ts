import { Router } from 'express';
import { NoteService } from '../note/note.service';
import { NoteController } from '../note/note.controller';
import { NoteRouter } from '../note/note.router';

export class ExpressRouter {
  router = Router();

  private noteController!: NoteController;
  private noteRouter!: NoteRouter;

  constructor(private noteService: NoteService) {
    this.configureControllers();
    this.configureRouters();
    this.configureRoutes();
  }

  private configureControllers(): void {
    this.noteController = new NoteController(this.noteService);
  }

  private configureRouters(): void {
    this.noteRouter = new NoteRouter(this.noteController);
  }

  private configureRoutes(): void {
    this.router.use('/note', this.noteRouter.router);
  }
}
