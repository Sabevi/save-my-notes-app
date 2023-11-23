import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserJSONService } from '../note/note.sequelize-service';
import { NoteService } from '../note/note.service';
import { sequelize } from '../database/database';
import * as dotenv from 'dotenv';

export class ExpressApplication {
  private expressRouter!: ExpressRouter;
  private port!: string;
  private server!: ExpressServer;
  private noteService!: NoteService;

  constructor() {
    this.configureApplication();
  }

  bootstrap(): void {
    this.server.bootstrap();
  }

  private configureApplication(): void {
    this.configureEnvironment();
    this.configureServerPort();
    this.configureServices();
    this.configureExpressRouter();
    this.configureServer();
  }

  private configureEnvironment(): void {
    dotenv.config({
      path: '.env',
    });
  }

  private configureServerPort(): void {
    this.port = this.getPort();
  }

  private configureServices(): void {
    this.noteService = new UserJSONService();
  }

  private configureExpressRouter(): void {
    this.expressRouter = new ExpressRouter(this.noteService);
  }

  private async configureServer(): Promise<void> {
    this.server = new ExpressServer(this.expressRouter, this.port);

    try {
      await sequelize.sync();
      console.log('database is ready');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  private getPort(): string {
    const port = process.env.PORT;
    if (!port) {
      throw new Error('No port was found in env file.');
    }

    return port;
  }
}
