import cors from 'cors';
import express, { json, Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import dotenv from 'dotenv';
import { AppDataSource } from './database/config';
import { DiaryRoute } from './routes/diary';
import { Server } from 'http';
import { TYPES } from './types';

@injectable()
export class AppServer {
  public app: express.Application;
  public appServer: Server;
  constructor(@inject(TYPES.DiaryRoute) private diaryRoute: DiaryRoute) {
    this.app = express();
  }

  public async setUp() {
    this.app.use(json());
    this.app.use(cors());
    this.app.use('/diary', this.diaryRoute.router);
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ message: err.message });
      },
    );
    await AppDataSource.initialize();
    console.log('successed initialization');
  }

  public start() {
    dotenv.config();
    const port = process.env.PORT;
    this.appServer = this.app.listen({ port: port }, () => {
      console.log('server started');
    });
  }

  public async stop() {
    await AppDataSource.destroy();
    this.appServer.close();
  }
}
